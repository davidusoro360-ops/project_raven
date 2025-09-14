// CourseMatesChat.types.ts - Type definitions for the Course Mates Chat component
export interface CourseMate {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  unreadCount?: number;
}

export interface ChatCategory {
  id: string;
  title: string;
  count: number;
  mates: CourseMate[];
}

export interface CourseMatesChatProps {
  categories: ChatCategory[];
  className?: string;
}