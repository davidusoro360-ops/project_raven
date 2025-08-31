import { Roommate } from '@/components/molecules/RoommateModal/RoommateModal.types';

export const roommatesData: Roommate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 20,
    gender: 'Female',
    course: 'Computer Science',
    year: '2nd Year',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Looking for a clean, studious roommate who enjoys quiet evenings and weekend adventures!',
    preferences: {
      cleanliness: 'Very Clean',
      studyHabits: 'Quiet',
      sleepSchedule: 'Early Bird',
      socialLevel: 'Social'
    },
    location: {
      current: 'Campus Dorms',
      preferred: 'Near Campus',
      maxDistance: 5
    },
    budget: {
      min: 400,
      max: 600,
      currency: 'USD'
    },
    interests: ['Reading', 'Hiking', 'Cooking', 'Movies'],
    contactInfo: {
      email: 'sarah.j@university.edu',
      phone: '+1234567890',
      social: {
        instagram: '@sarahj_adventures',
        linkedin: 'sarah-johnson-cs'
      }
    },
    verified: true,
    rating: 4.8,
    reviewCount: 12,
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 21,
    gender: 'Male',
    course: 'Engineering',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Engineering student seeking a responsible roommate. Love gaming and tech discussions!',
    preferences: {
      cleanliness: 'Clean',
      studyHabits: 'Moderate',
      sleepSchedule: 'Night Owl',
      socialLevel: 'Moderate'
    },
    location: {
      current: 'Off-Campus',
      preferred: 'Near Campus',
      maxDistance: 10
    },
    budget: {
      min: 500,
      max: 800,
      currency: 'USD'
    },
    interests: ['Gaming', 'Technology', 'Basketball', 'Music'],
    contactInfo: {
      email: 'michael.chen@university.edu',
      social: {
        twitter: '@mikec_tech',
        linkedin: 'michael-chen-eng'
      }
    },
    verified: true,
    rating: 4.6,
    reviewCount: 8,
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    age: 19,
    gender: 'Female',
    course: 'Psychology',
    year: '1st Year',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'First-year psych student looking for a friendly, supportive living environment.',
    preferences: {
      cleanliness: 'Clean',
      studyHabits: 'Very Quiet',
      sleepSchedule: 'Flexible',
      socialLevel: 'Very Social'
    },
    location: {
      current: 'Home',
      preferred: 'Campus Area',
      maxDistance: 3
    },
    budget: {
      min: 300,
      max: 500,
      currency: 'USD'
    },
    interests: ['Art', 'Yoga', 'Volunteering', 'Photography'],
    contactInfo: {
      email: 'emma.r@university.edu',
      social: {
        instagram: '@emma_captures'
      }
    },
    verified: false,
    rating: 4.9,
    reviewCount: 5,
    lastActive: '30 minutes ago'
  }
];