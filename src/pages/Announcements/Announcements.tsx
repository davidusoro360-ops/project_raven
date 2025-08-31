import React, { useState } from 'react';
import { AnnouncementCard } from '../../components/molecules/AnnouncementCard/AnnouncementCard';
import { Calendar } from '../../components/molecules/Calendar/Calendar';

export const Announcements: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const announcements = [
    {
      title: "PHY 111 Test Tomorrow",
      subtitle: "Final examination - Science Lab A",
      badge: "URGENT",
      countdown: "18h 32m"
    },
    {
      title: "Library Hours Extended",
      subtitle: "Open until 11 PM during finals week",
      badge: "INFO",
      countdown: "2d 5h"
    },
    {
      title: "Campus WiFi Maintenance",
      subtitle: "Network will be down for 2 hours",
      badge: "NOTICE",
      countdown: "1d 12h"
    },
    {
      title: "Student Council Elections",
      subtitle: "Vote for your representatives",
      badge: "REMINDER",
      countdown: "5d 8h"
    },
    {
      title: "Career Fair Registration",
      subtitle: "Register now for the spring career fair",
      badge: "OPPORTUNITY",
      countdown: "7d 15h"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Professional Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">All Announcements</h1>
                <p className="text-sm text-gray-500">Stay informed with latest updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Area */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Enhanced Calendar Section */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-1 shadow-sm border border-gray-200/50">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>

        {/* Enhanced Announcements Section */}
        <div className="space-y-6">
          {/* Professional Section Header */}
          <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Today's Announcements</h2>
                <p className="text-sm text-gray-500">Latest updates and notices</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {announcements.length} items
              </span>
            </div>
          </div>

          {/* Enhanced Announcements List */}
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="relative">
                <AnnouncementCard
                  title={announcement.title}
                  subtitle={announcement.subtitle}
                  badge={announcement.badge}
                  countdown={announcement.countdown}
                  variant="page"
                  className="transform transition-all duration-300 hover:scale-[1.01]"
                />

                {/* Priority indicators for urgent items */}
                {announcement.badge === 'URGENT' && (
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                )}
              </div>
            ))}
          </div>

          {/* Professional Footer */}
          <div className="mt-8 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-200/50 text-center">
            <p className="text-sm text-gray-500">
              All announcements are automatically updated
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
