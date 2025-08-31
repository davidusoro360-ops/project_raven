import { Course } from '@/types';

export interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}
