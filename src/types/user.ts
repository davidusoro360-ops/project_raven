import { BaseEntity } from './common';

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  year?: number;
  isVerified: boolean;
}

export type UserRole = 'student' | 'lecturer' | 'admin' | 'super_admin';

export interface UserProfile extends User {
  bio?: string;
  phone?: string;
  address?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    showProfile: boolean;
    showCourses: boolean;
  };
}
