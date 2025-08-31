/**
 * Roommate Service
 * ------------------------------------------------------------
 * Purpose:
 * - Centralizes data and logic for the "Find a Roommate" flow.
 * - Manages preferences, likes, connections, simple local chat, and matching.
 *
 * Data Sources:
 * - Mock roommate profiles: see src/data/roommates.ts
 * - Persistence: localStorage keys (see KEYS below)
 *
 * Public API:
 * - getAllRoommates(): Roommate[]
 * - savePreferences(prefs), loadPreferences(): store/retrieve user preference form
 * - getLikes(), toggleLike(id): manage liked roommates as Set&lt;string&gt;
 * - getConnections(), toggleConnection(id): connect/disconnect to a roommate (timestamp map)
 * - getMessages(id), sendMessage(id, content): lightweight local chat per roommate
 * - findMatches(prefs, pool?): RankedMatch[] — filters by hard constraints then ranks by similarity
 *
 * Matching Overview:
 * - Hard constraints: gender, course, year, location, budget overlap, max distance
 * - Soft scoring:
 *   * Lifestyle closeness: cleanliness, studyHabits, sleepSchedule, socialLevel (weighted)
 *   * Shared interests bonus (up to +3)
 *   * Verified + small rating bonus
 *
 * Notes:
 * - This is a client-side prototype (no backend). All persistence is localStorage.
 * - Designed so you can replace data source and persistence later with real APIs.
 */
import { roommatesData } from '@/data/roommates';
import type { Roommate } from '@/components/molecules/RoommateModal/RoommateModal.types';

export type Cleanliness = 'Very Clean' | 'Clean' | 'Moderate' | 'Relaxed';
export type StudyHabits = 'Very Quiet' | 'Quiet' | 'Moderate' | 'Social';
export type SleepSchedule = 'Early Bird' | 'Night Owl' | 'Flexible';
export type SocialLevel = 'Very Social' | 'Social' | 'Moderate' | 'Private';

export interface UserRoommatePreferences {
  gender: 'Male' | 'Female' | 'Other' | 'Any';
  course: string | 'Any';
  year: string | 'Any';
  location: string | 'Any';
  budgetRange: { min: number; max: number };
  maxDistance: number; // km
  preferences: {
    cleanliness?: Cleanliness;
    studyHabits?: StudyHabits;
    sleepSchedule?: SleepSchedule;
    socialLevel?: SocialLevel;
  };
  interests?: string[];
}

export interface RankedMatch {
  roommate: Roommate;
  score: number;
  reasons: string[];
}

const KEYS = {
  prefs: 'roommateUserPrefs',
  likes: 'roommateLikes',
  connections: 'roommateConnections',
  messagesPrefix: 'roommateMessages:', // + id
} as const;

export const getAllRoommates = (): Roommate[] => roommatesData.slice();

export function savePreferences(prefs: UserRoommatePreferences) {
  localStorage.setItem(KEYS.prefs, JSON.stringify(prefs));
}

export function loadPreferences(): UserRoommatePreferences | null {
  const raw = localStorage.getItem(KEYS.prefs);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserRoommatePreferences;
  } catch {
    return null;
  }
}

export function getLikes(): Set<string> {
  try {
    const raw = localStorage.getItem(KEYS.likes);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

export function toggleLike(id: string): Set<string> {
  const current = getLikes();
  if (current.has(id)) current.delete(id);
  else current.add(id);
  try {
    localStorage.setItem(KEYS.likes, JSON.stringify(Array.from(current)));
  } catch {}
  return current;
}

export function getConnections(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(KEYS.connections) || '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

export function toggleConnection(id: string): Record<string, string> {
  const map = getConnections();
  if (map[id]) delete map[id];
  else map[id] = new Date().toISOString();
  try {
    localStorage.setItem(KEYS.connections, JSON.stringify(map));
  } catch {}
  return map;
}

export interface ChatMessage {
  id: string;
  role: 'me' | 'them';
  content: string;
  timestamp: string; // ISO
}

function msgKey(id: string) {
  return KEYS.messagesPrefix + id;
}

export function getMessages(id: string): ChatMessage[] {
  try {
    return JSON.parse(localStorage.getItem(msgKey(id)) || '[]') as ChatMessage[];
  } catch {
    return [];
  }
}

export function sendMessage(id: string, content: string): ChatMessage {
  const msg: ChatMessage = {
    id: cryptoRandomId(),
    role: 'me',
    content,
    timestamp: new Date().toISOString(),
  };
  const all = getMessages(id);
  all.push(msg);
  try {
    localStorage.setItem(msgKey(id), JSON.stringify(all));
  } catch {}
  return msg;
}

// Matching

const orderings = {
  cleanliness: ['Relaxed', 'Moderate', 'Clean', 'Very Clean'] as const,
  studyHabits: ['Social', 'Moderate', 'Quiet', 'Very Quiet'] as const,
  sleepSchedule: ['Night Owl', 'Flexible', 'Early Bird'] as const,
  socialLevel: ['Private', 'Moderate', 'Social', 'Very Social'] as const,
};

function closenessScore<T extends string>(
  pref: T | undefined,
  actual: T,
  order: readonly T[],
  weight: number
): { score: number; reason?: string } {
  if (!pref) return { score: 0 };
  const pi = order.indexOf(pref);
  const ai = order.indexOf(actual);
  if (pi === -1 || ai === -1) return { score: 0 };
  const diff = Math.abs(pi - ai);
  const s = diff === 0 ? weight : diff === 1 ? weight * 0.5 : 0;
  const reason = diff === 0 ? `Matches ${String(pref)}` : diff === 1 ? `Close on ${String(pref)}` : undefined;
  return { score: s, reason };
}

function interestsOverlap(a: string[] = [], b: string[] = []): number {
  const sa = new Set(a.map((x) => x.toLowerCase().trim()).filter(Boolean));
  let count = 0;
  for (const it of b) {
    if (sa.has(it.toLowerCase().trim())) count++;
  }
  return count;
}

function budgetsOverlap(userMin: number, userMax: number, rmMin: number, rmMax: number): boolean {
  return Math.max(userMin, rmMin) <= Math.min(userMax, rmMax);
}

export function findMatches(prefs: UserRoommatePreferences, pool: Roommate[] = getAllRoommates()): RankedMatch[] {
  const hardFiltered = pool.filter((r) => {
    const genderOk = prefs.gender === 'Any' || r.gender === prefs.gender;
    const courseOk = prefs.course === 'Any' || r.course === prefs.course;
    const yearOk = prefs.year === 'Any' || r.year === prefs.year;
    const locOk =
      prefs.location === 'Any' || r.location.current === prefs.location || r.location.preferred === prefs.location;
    const budgetOk = budgetsOverlap(prefs.budgetRange.min, prefs.budgetRange.max, r.budget.min, r.budget.max);
    const distanceOk = r.location.maxDistance <= prefs.maxDistance;
    return genderOk && courseOk && yearOk && locOk && budgetOk && distanceOk;
  });

  const ranked = hardFiltered.map((r) => {
    let score = 0;
    const reasons: string[] = [];

    const c1 = closenessScore(prefs.preferences.cleanliness, r.preferences.cleanliness, orderings.cleanliness, 3);
    score += c1.score;
    if (c1.reason) reasons.push(c1.reason);
    const c2 = closenessScore(prefs.preferences.studyHabits, r.preferences.studyHabits, orderings.studyHabits, 3);
    score += c2.score;
    if (c2.reason) reasons.push(c2.reason);
    const c3 = closenessScore(prefs.preferences.sleepSchedule, r.preferences.sleepSchedule, orderings.sleepSchedule, 2);
    score += c3.score;
    if (c3.reason) reasons.push(c3.reason);
    const c4 = closenessScore(prefs.preferences.socialLevel, r.preferences.socialLevel, orderings.socialLevel, 2);
    score += c4.score;
    if (c4.reason) reasons.push(c4.reason);

    const i = interestsOverlap(prefs.interests || [], r.interests || []);
    if (i > 0) {
      score += Math.min(3, i); // up to +3
      reasons.push(`${i} shared interest${i > 1 ? 's' : ''}`);
    }

    // small boosts
    if (r.verified) {
      score += 0.5;
      reasons.push('Verified');
    }
    score += Math.min(0.5, Math.max(0, (5 - Math.max(0, 5 - r.rating)) * 0.05)); // tiny rating boost

    return { roommate: r, score: Math.round(score * 100) / 100, reasons };
  });

  ranked.sort((a, b) => b.score - a.score);
  return ranked;
}

// Utilities
function cryptoRandomId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  return 'm_' + Math.random().toString(36).slice(2);
}