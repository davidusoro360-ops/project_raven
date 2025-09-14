/**
 * RoommatePreferences Page
 * ------------------------------------------------------------
 * Purpose:
 * - Collect user preferences for the roommate matching flow, then persist and route to results.
 *
 * Key UX:
 * - Fields: Gender, Course, Year, Location, Budget range (min/max), Max distance (km)
 * - Lifestyle preferences: Cleanliness, Study habits, Sleep schedule, Social level
 * - Interests: Comma-separated list
 *
 * Data Flow:
 * - Prefill from saved preferences via roommateService.loadPreferences()
 * - On submit, save via roommateService.savePreferences() and navigate to /roommates/results
 *
 * Notes:
 * - This page is intentionally simple and does not hit a backend (localStorage only).
 * - You can expand lists (courses/years/locations) or replace with API data as needed.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  savePreferences,
  loadPreferences,
  type UserRoommatePreferences,
} from '@/services/roommateService';

const genders = ['Any', 'Male', 'Female', 'Other'] as const;
const courses = ['Any', 'Computer Science', 'Engineering', 'Psychology', 'Business', 'Medicine', 'Arts'] as const;
const years = ['Any', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'] as const;
const locations = ['Any', 'Campus Dorms', 'Near Campus', 'Off-Campus', 'Campus Area'] as const;

export const RoommatePreferences: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<UserRoommatePreferences>({
    gender: 'Any',
    course: 'Any',
    year: 'Any',
    location: 'Any',
    budgetRange: { min: 300, max: 800 },
    maxDistance: 10,
    preferences: {},
    interests: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const existing = loadPreferences();
    if (existing) setForm(existing);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (form.budgetRange.min < 0) newErrors.budgetMin = 'Minimum budget must be non-negative';
    if (form.budgetRange.max < 0) newErrors.budgetMax = 'Maximum budget must be non-negative';
    if (form.budgetRange.min > form.budgetRange.max) newErrors.budgetRange = 'Minimum budget must be less than or equal to maximum';
    if (form.maxDistance < 0) newErrors.maxDistance = 'Maximum distance must be non-negative';
    if (form.interests) {
      const trimmed = form.interests.map(i => i.trim()).filter(Boolean);
      if (trimmed.length !== form.interests.length) newErrors.interests = 'Interests cannot be empty or contain only whitespace';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    savePreferences(form);
    navigate('/roommates/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Find a Roommate</h1>
              <p className="text-sm text-gray-500">Tell us what you prefer, we’ll find your best matches</p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
          >
            Back
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basics */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  {genders.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm((f) => ({ ...f, course: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  {courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Preference</label>
                <select
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Budget / Distance */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget & Distance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Min (USD)</label>
                <input
                  type="number"
                  value={form.budgetRange.min}
                  onChange={(e) => {
                    const val = Number(e.target.value || 0);
                    setForm((f) => ({ ...f, budgetRange: { ...f.budgetRange, min: val } }));
                    if (val >= 0 && val <= form.budgetRange.max) {
                      setErrors((err) => ({ ...err, budgetMin: '', budgetRange: '' }));
                    } else if (val < 0) {
                      setErrors((err) => ({ ...err, budgetMin: 'Minimum budget must be non-negative' }));
                    } else {
                      setErrors((err) => ({ ...err, budgetRange: 'Minimum budget must be less than or equal to maximum' }));
                    }
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                />
                {errors.budgetMin && <p className="text-red-500 text-xs mt-1">{errors.budgetMin}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Max (USD)</label>
                <input
                  type="number"
                  value={form.budgetRange.max}
                  onChange={(e) => {
                    const val = Number(e.target.value || 0);
                    setForm((f) => ({ ...f, budgetRange: { ...f.budgetRange, max: val } }));
                    if (val >= 0 && val >= form.budgetRange.min) {
                      setErrors((err) => ({ ...err, budgetMax: '', budgetRange: '' }));
                    } else if (val < 0) {
                      setErrors((err) => ({ ...err, budgetMax: 'Maximum budget must be non-negative' }));
                    } else {
                      setErrors((err) => ({ ...err, budgetRange: 'Maximum budget must be greater than or equal to minimum' }));
                    }
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                />
                {errors.budgetMax && <p className="text-red-500 text-xs mt-1">{errors.budgetMax}</p>}
                {errors.budgetRange && <p className="text-red-500 text-xs mt-1">{errors.budgetRange}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Distance (km)</label>
                <input
                  type="number"
                  value={form.maxDistance}
                  min={0}
                  onChange={(e) => {
                    const val = Number(e.target.value || 0);
                    setForm((f) => ({ ...f, maxDistance: val }));
                    if (val >= 0) {
                      setErrors((err) => ({ ...err, maxDistance: '' }));
                    } else {
                      setErrors((err) => ({ ...err, maxDistance: 'Maximum distance must be non-negative' }));
                    }
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                />
                {errors.maxDistance && <p className="text-red-500 text-xs mt-1">{errors.maxDistance}</p>}
              </div>
            </div>
          </section>

          {/* Lifestyle */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cleanliness</label>
                <select
                  value={form.preferences.cleanliness || ''}
                  onChange={(e) => setForm((f) => ({ ...f, preferences: { ...f.preferences, cleanliness: (e.target.value || undefined) as any } }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">No preference</option>
                  {['Very Clean','Clean','Moderate','Relaxed'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Study Habits</label>
                <select
                  value={form.preferences.studyHabits || ''}
                  onChange={(e) => setForm((f) => ({ ...f, preferences: { ...f.preferences, studyHabits: (e.target.value || undefined) as any } }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">No preference</option>
                  {['Very Quiet','Quiet','Moderate','Social'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Schedule</label>
                <select
                  value={form.preferences.sleepSchedule || ''}
                  onChange={(e) => setForm((f) => ({ ...f, preferences: { ...f.preferences, sleepSchedule: (e.target.value || undefined) as any } }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">No preference</option>
                  {['Early Bird','Night Owl','Flexible'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Social Level</label>
                <select
                  value={form.preferences.socialLevel || ''}
                  onChange={(e) => setForm((f) => ({ ...f, preferences: { ...f.preferences, socialLevel: (e.target.value || undefined) as any } }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">No preference</option>
                  {['Very Social','Social','Moderate','Private'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Interests */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comma-separated interests</label>
            <input
              type="text"
              value={(form.interests || []).join(', ')}
              onChange={(e) => {
                const raw = e.target.value;
                const items = raw.split(',').map(s => s.trim()).filter(Boolean);
                setForm((f) => ({ ...f, interests: items }));
                if (items.length > 0 && items.every(i => i.length > 0)) {
                  setErrors((err) => ({ ...err, interests: '' }));
                } else if (raw.trim()) {
                  setErrors((err) => ({ ...err, interests: 'Interests cannot be empty or contain only whitespace' }));
                }
              }}
              placeholder="e.g. Reading, Hiking, Music"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
            />
            {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests}</p>}
          </section>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setForm({
                gender: 'Any',
                course: 'Any',
                year: 'Any',
                location: 'Any',
                budgetRange: { min: 300, max: 800 },
                maxDistance: 10,
                preferences: {},
                interests: [],
              })}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="px-6 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              See Matches
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};