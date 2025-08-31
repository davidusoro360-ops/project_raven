export interface StudyGroup {
  id: string;
  subject: string;
  topic: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  organizer: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isJoined: boolean;
}

export interface StudyGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
