export interface CalendarProps {
  className?: string;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}
