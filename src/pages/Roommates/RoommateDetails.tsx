/**
 * RoommateDetails Page
 * ------------------------------------------------------------
 * Purpose:
 * - Present full profile details for a selected roommate.
 * - Provide actions to Like, Connect, and start a Chat thread.
 *
 * Data Flow:
 * - Pulls roommate profile from getAllRoommates() using :id route param.
 * - Reads/writes Likes and Connections via roommateService (localStorage).
 * - "Chat" link navigates to /roommates/chat/:id which persists messages locally.
 *
 * UX:
 * - Header with quick actions (Like, Connect, Chat).
 * - Profile card summarizing identity, verification, rating, budget, location, lifestyle.
 * - Interests and Contact sections for quick scanning.
 *
 * Notes:
 * - This is a client-side demo. Replace service calls with API calls when backend is available.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Star, Mail, Phone, MapPin, DollarSign, BookOpen, Clock, Home, MessageCircle } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { getAllRoommates, getLikes, toggleLike, getConnections, toggleConnection } from '@/services/roommateService';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5">
    <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
    {children}
  </section>
);

const Stat: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-medium text-gray-900">{value}</div>
    </div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{children}</span>
);

const VerifiedBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
    <Shield className="w-3 h-3" /> Verified
  </span>
);

const RatingBadge: React.FC<{ rating: number; reviews: number }> = ({ rating, reviews }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
    <Star className="w-3 h-3 fill-current" /> {rating} ({reviews})
  </span>
);

const RoommateDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const roommate = useMemo(() => getAllRoommates().find((r) => r.id === id), [id]);

  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [connections, setConnections] = useState<Record<string, string>>({});

  useEffect(() => {
    setLikes(getLikes());
    setConnections(getConnections());
  }, []);

  if (!roommate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-gray-100 rounded-xl" aria-label="Back">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                <p className="text-sm text-gray-500">Not found</p>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-600">This roommate was not found. Return to results and try again.</p>
            <button
              onClick={() => navigate('/roommates/results')}
              className="mt-4 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gray-900 hover:bg-black"
            >
              Back to Matches
            </button>
          </div>
        </main>
      </div>
    );
  }

  const isLiked = likes.has(roommate.id);
  const isConnected = Boolean(connections[roommate.id]);

  const onLike = () => setLikes(toggleLike(roommate.id));
  const onConnect = () => setConnections(toggleConnection(roommate.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-gray-100 rounded-xl" aria-label="Back">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Roommate Profile</h1>
              <p className="text-sm text-gray-500">View details and start a chat</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                isLiked ? 'text-red-600 bg-red-50' : 'text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-3 h-3 ${isLiked ? 'fill-current text-red-600' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={onConnect}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                isConnected ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-900 text-white hover:bg-black'
              }`}
            >
              {isConnected ? 'Connected' : 'Connect'}
            </button>
            <Link
              to={`/roommates/chat/${roommate.id}`}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" /> Chat
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header Card */}
        <div className="bg-white border border-black rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar
                src={roommate.avatar}
                alt={roommate.name}
                size="lg"
                fallback={roommate.name.split(' ').map((n) => n[0]).join('')}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2">
                <h2 className="text-xl font-bold text-gray-900">{roommate.name}</h2>
                <RatingBadge rating={roommate.rating} reviews={roommate.reviewCount} />
                {roommate.verified && <VerifiedBadge />}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {roommate.age} • {roommate.gender} • {roommate.course} • {roommate.year}
              </div>
              <p className="text-sm text-gray-700 mt-3">{roommate.bio}</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Stat icon={<BookOpen className="w-4 h-4 text-gray-600" />} label="Study Habits" value={roommate.preferences.studyHabits} />
                <Stat icon={<Clock className="w-4 h-4 text-gray-600" />} label="Sleep Schedule" value={roommate.preferences.sleepSchedule} />
                <Stat icon={<Home className="w-4 h-4 text-gray-600" />} label="Cleanliness" value={roommate.preferences.cleanliness} />
                <Stat icon={<MapPin className="w-4 h-4 text-gray-600" />} label="Preferred Area" value={`${roommate.location.preferred} • ≤ ${roommate.location.maxDistance}km`} />
                <Stat
                  icon={<DollarSign className="w-4 h-4 text-gray-600" />}
                  label="Budget"
                  value={`${roommate.budget.currency} ${roommate.budget.min}-${roommate.budget.max}/mo`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interests */}
        <Section title="Interests">
          {roommate.interests?.length ? (
            <div className="flex flex-wrap gap-2">
              {roommate.interests.map((i, idx) => (
                <Pill key={idx}>{i}</Pill>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-600">No interests provided.</div>
          )}
        </Section>

        {/* Contact */}
        <Section title="Contact">
          <div className="flex items-center gap-4 text-sm text-gray-700 flex-wrap">
            {roommate.contactInfo.email && (
              <a className="inline-flex items-center gap-1 hover:underline" href={`mailto:${roommate.contactInfo.email}`}>
                <Mail className="w-4 h-4" /> {roommate.contactInfo.email}
              </a>
            )}
            {roommate.contactInfo.phone && (
              <a className="inline-flex items-center gap-1 hover:underline" href={`tel:${roommate.contactInfo.phone}`}>
                <Phone className="w-4 h-4" /> {roommate.contactInfo.phone}
              </a>
            )}
          </div>
          {(roommate.contactInfo.social?.instagram ||
            roommate.contactInfo.social?.twitter ||
            roommate.contactInfo.social?.linkedin) && (
            <div className="mt-3 text-xs text-gray-600">
              Social:
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                {roommate.contactInfo.social?.instagram && <Pill>{roommate.contactInfo.social.instagram}</Pill>}
                {roommate.contactInfo.social?.twitter && <Pill>{roommate.contactInfo.social.twitter}</Pill>}
                {roommate.contactInfo.social?.linkedin && <Pill>{roommate.contactInfo.social.linkedin}</Pill>}
              </div>
            </div>
          )}
        </Section>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/roommates/results')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back to Matches
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onLike}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isLiked ? 'text-red-600 bg-red-50' : 'text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-600' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={onConnect}
              className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                isConnected ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-900 text-white hover:bg-black'
              }`}
            >
              {isConnected ? 'Connected' : 'Connect'}
            </button>
            <Link
              to={`/roommates/chat/${roommate.id}`}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Chat
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoommateDetails;