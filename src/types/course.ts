import { BaseEntity } from './common';
import { User } from './user';

export interface Course extends BaseEntity {
  code: string;
  title: string;
  description: string;
  credits: number;
  department: string;
  semester: string;
  year: number;
  schedule: CourseSchedule;
  lecturer: CourseLecturer;
  color: string;
  isEnrolled?: boolean;
}

export interface CourseSchedule {
  startTime: string;
  endTime: string;
  venue: string;
  days: string[];
  timezone: string;
}

export interface CourseLecturer {
  id: string;
  name: string;
  title: string;
  email: string;
  avatar?: string;
}

export interface CourseEnrollment extends BaseEntity {
  courseId: string;
  studentId: string;
  enrollmentDate: string;
  status: 'active' | 'dropped' | 'completed';
  grade?: string;
}

export interface CourseAnnouncement extends BaseEntity {
  courseId: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  publishedAt: string;
  expiresAt?: string;
  author: User;
}
