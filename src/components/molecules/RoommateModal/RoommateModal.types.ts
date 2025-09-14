export interface Roommate {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  course: string;
  year: string;
  avatar: string;
  bio: string;
  preferences: {
    cleanliness: 'Very Clean' | 'Clean' | 'Moderate' | 'Relaxed';
    studyHabits: 'Very Quiet' | 'Quiet' | 'Moderate' | 'Social';
    sleepSchedule: 'Early Bird' | 'Night Owl' | 'Flexible';
    socialLevel: 'Very Social' | 'Social' | 'Moderate' | 'Private';
  };
  location: {
    current: string;
    preferred: string;
    maxDistance: number; // in km
    coords?: {
      lat: number;
      lng: number;
    };
  };
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  interests: string[];
  contactInfo: {
    email: string;
    phone?: string;
    social?: {
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
  verified: boolean;
  rating: number;
  reviewCount: number;
  isMatched?: boolean;
  lastActive: string;
}

export interface RoommateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RoommateFilters {
  gender: string;
  course: string;
  year: string;
  location: string;
  budgetRange: {
    min: number;
    max: number;
  };
  preferences: {
    cleanliness?: string;
    studyHabits?: string;
    sleepSchedule?: string;
    socialLevel?: string;
  };
}
