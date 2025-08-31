export interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  badge?: string;
  countdown?: string;
  description?: string;
  location?: string;
  instructor?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}
