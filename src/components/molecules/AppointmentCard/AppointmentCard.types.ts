export interface AppointmentCardProps {
  title: string;
  doctorName: string;
  doctorTitle: string;
  doctorAvatar: string;
  time: string;
  date: string;
  className?: string;
  onClick?: () => void;
}
