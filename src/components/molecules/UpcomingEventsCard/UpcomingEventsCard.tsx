// UpcomingEventsCard.tsx - Scalable component for displaying upcoming events with mock data
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  organizerAvatar: string;
}

interface UpcomingEventsCardProps {
  className?: string;
  onEventClick?: (eventId: string) => void;
}

export const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  className = '',
  onEventClick,
}) => {
  // Mock data for upcoming events - easily extensible by updating this array
  const events: Event[] = [
    {
      id: '1',
      title: 'Campus Career Fair',
      date: 'Tomorrow',
      time: '10:00 AM - 4:00 PM',
      location: 'Student Union Hall',
      organizer: 'Career Services',
      organizerAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '2',
      title: 'Study Group Kickoff',
      date: 'This Friday',
      time: '2:00 PM - 5:00 PM',
      location: 'Library Room 101',
      organizer: 'Academic Affairs',
      organizerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '3',
      title: 'Wellness Workshop',
      date: 'Next Monday',
      time: '11:00 AM - 12:30 PM',
      location: 'Health Center',
      organizer: 'Student Wellness',
      organizerAvatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    },
  ];

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-600" />
        Upcoming Events
      </h3>
      
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200 hover:border-gray-300"
            onClick={() => onEventClick?.(event.id)}
          >
            <Avatar
              src={event.organizerAvatar}
              alt={event.organizer}
              size="sm"
              fallback={event.organizer.split(' ').map(n => n[0]).join('')}
              className="flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm truncate">{event.title}</h4>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{event.organizer}</p>
            </div>
            
            <div className="text-xs text-gray-500 font-medium">
              {event.date}
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Button for extensibility */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
          View All Events
        </button>
      </div>
    </div>
  );
};