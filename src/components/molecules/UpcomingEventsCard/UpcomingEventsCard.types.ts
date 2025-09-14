// UpcomingEventsCard.types.ts - Type definitions for the Upcoming Events Card component
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  organizerAvatar: string;
}

export interface UpcomingEventsCardProps {
  className?: string;
  onEventClick?: (eventId: string) => void;
}