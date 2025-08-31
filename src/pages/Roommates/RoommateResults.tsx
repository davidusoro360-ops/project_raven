/**
 * RoommateResults Page
 * ------------------------------------------------------------
 * Purpose:
 * - Render ranked roommate matches based on previously saved preferences.
 *
 * Data Flow:
 * - Loads user preferences via roommateService.loadPreferences().
 * - Computes matches with roommateService.findMatches() (hard constraints + weighted lifestyle similarity).
 * - Reads/writes likes and connections via roommateService.getLikes()/toggleLike() and getConnections()/toggleConnection().
 *
 * UX:
 * - Inline search box filters matches by name or course.
 * - Actions per match: Like/Unlike, Connect/Disconnect, View Details, Chat.
 * - "Refine" button navigates back to the preferences form (/roommates) to adjust filters.
 *
 * Routes:
 * - Back to form: /roommates
 * - Details page: /roommates/details/:id
 * - Chat page: /roommates/chat/:id
 *
 * Persistence:
 * - All interaction state (preferences, likes, connections, chat) is persisted in localStorage through the service.
 */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Phone, User, Star, ArrowLeft, MessageCircle } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { loadPreferences, findMatches, getLikes, toggleLike, getConnections, toggleConnection, type RankedMatch } from '@/services/roommateService';

export const RoommateResults: React.FC = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<RankedMatch[]>([]);
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [query, setQuery] = useState('');

  useEffect(() => {
    const prefs = loadPreferences();
    if (!prefs) {
      navigate('/roommates', { replace: true });
      return;
    }
    setLikes(getLikes());
    setConnections(getConnections());
    const ranked = findMatches(prefs);
    setMatches(ranked);
  }, [navigate]);

  const onLike = (id: string) => {
    setLikes(toggleLike(id));
  };

  const onConnect = (id: string) => {
    setConnections(toggleConnection(id));
  };

  const filtered = matches.filter(m =>
    m.roommate.name.toLowerCase().includes(query.toLowerCase()) ||
    m.roommate.course.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/roommates')}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Your Matches</h1>
              <p className="text-sm text-gray-500">Based on your preferences</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search matches..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm w-56"
            />
            <button
              onClick={() => navigate('/roommates')}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
            >
              Refine
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-center bg-white/70 border border-gray-200 rounded-2xl p-10">
            <User className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-900 mb-1">No matches found</h2>
            <p className="text-sm text-gray-600 mb-4">Try updating your preferences to broaden your results.</p>
            <button
              onClick={() => navigate('/roommates')}
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-900"
            >
              Update Preferences
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(({ roommate, score, reasons }) => (
              <div key={roommate.id} className="bg-white border border-black rounded-2xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar
                      src={roommate.avatar}
                      alt={roommate.name}
                      size="md"
                      fallback={roommate.name.split(' ').map(n => n[0]).join('')}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-gray-900">{roommate.name}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Score {score}</span>
                      </div>
                      <div className="text-sm text-gray-600">{roommate.age} • {roommate.gender} • {roommate.course} • {roommate.year}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{roommate.rating} ({roommate.reviewCount})</span>
                      </div>
                      {reasons.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {reasons.slice(0,4).map((r, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{r}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLike(roommate.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${likes.has(roommate.id) ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'}`}
                    >
                      <Heart className={`w-3 h-3 ${likes.has(roommate.id) ? 'fill-current text-red-600' : ''}`} />
                      {likes.has(roommate.id) ? 'Liked' : 'Like'}
                    </button>
                    <button
                      onClick={() => onConnect(roommate.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${connections[roommate.id] ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-900 text-white hover:bg-black'}`}
                    >
                      {connections[roommate.id] ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-3 text-xs text-gray-700 flex-wrap">
                    {roommate.contactInfo.email && (
                      <a className="inline-flex items-center gap-1 hover:underline" href={`mailto:${roommate.contactInfo.email}`}>
                        <Mail className="w-3 h-3" /> {roommate.contactInfo.email}
                      </a>
                    )}
                    {roommate.contactInfo.phone && (
                      <a className="inline-flex items-center gap-1 hover:underline" href={`tel:${roommate.contactInfo.phone}`}>
                        <Phone className="w-3 h-3" /> {roommate.contactInfo.phone}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/roommates/details/${roommate.id}`}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/roommates/chat/${roommate.id}`}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" /> Chat
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RoommateResults;