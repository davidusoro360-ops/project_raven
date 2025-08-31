import { Course } from '@/types';

export interface CourseCardProps {
  course: Course;
  onViewMap?: (courseId: string) => void;
  onClick?: (course: Course) => void;
  className?: string;
}
