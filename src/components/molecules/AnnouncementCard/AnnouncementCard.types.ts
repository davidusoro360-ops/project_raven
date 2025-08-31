export interface AnnouncementCardProps {
  title: string;
  subtitle: string;
  badge?: string;
  countdown?: string;
  className?: string;
  onClick?: () => void;
  variant?: 'homepage' | 'page'; // NEW: Add variant prop for different styling
}
