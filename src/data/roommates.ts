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
      maxDistance: 5,
      coords: { lat: 6.5244, lng: 3.3792 }
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
      maxDistance: 10,
      coords: { lat: 6.5300, lng: 3.3850 }
    },
    budget: {
      min: 500,
      max: 800,
      currency: 'USD'
    },
    interests: ['Gaming', 'Technology', 'Basketball', 'Music'],
    contactInfo: {
      email: 'michael.chen@university.edu',
      phone: '+1234567891',
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
      maxDistance: 3,
      coords: { lat: 6.5200, lng: 3.3750 }
    },
    budget: {
      min: 300,
      max: 500,
      currency: 'USD'
    },
    interests: ['Art', 'Yoga', 'Volunteering', 'Photography'],
    contactInfo: {
      email: 'emma.r@university.edu',
      phone: '+1234567892',
      social: {
        instagram: '@emma_captures'
      }
    },
    verified: false,
    rating: 4.9,
    reviewCount: 5,
    lastActive: '30 minutes ago'
  },
  {
    id: '4',
    name: 'Alex Kim',
    age: 22,
    gender: 'Other',
    course: 'Business',
    year: '4th Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Senior business major seeking a flexible roommate for off-campus living.',
    preferences: {
      cleanliness: 'Moderate',
      studyHabits: 'Social',
      sleepSchedule: 'Night Owl',
      socialLevel: 'Social'
    },
    location: {
      current: 'Off-Campus',
      preferred: 'Off-Campus',
      maxDistance: 15,
      coords: { lat: 6.5350, lng: 3.3900 }
    },
    budget: {
      min: 600,
      max: 900,
      currency: 'USD'
    },
    interests: ['Entrepreneurship', 'Travel', 'Networking'],
    contactInfo: {
      email: 'alex.k@university.edu',
      phone: '+1234567893',
      social: {
        linkedin: 'alex-kim-business',
        twitter: '@alexkentrepreneur'
      }
    },
    verified: true,
    rating: 4.2,
    reviewCount: 10,
    lastActive: '5 hours ago'
  },
  {
    id: '5',
    name: 'Jordan Lee',
    age: 18,
    gender: 'Male',
    course: 'Medicine',
    year: '1st Year',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Freshman med student needing a quiet space to study.',
    preferences: {
      cleanliness: 'Very Clean',
      studyHabits: 'Very Quiet',
      sleepSchedule: 'Early Bird',
      socialLevel: 'Private'
    },
    location: {
      current: 'Campus Dorms',
      preferred: 'Campus Dorms',
      maxDistance: 2,
      coords: { lat: 6.5250, lng: 3.3800 }
    },
    budget: {
      min: 200,
      max: 400,
      currency: 'USD'
    },
    interests: [],
    contactInfo: {
      email: 'jordan.l@university.edu',
      phone: '+1234567894',
      social: {
        instagram: '@jordanmedstudent'
      }
    },
    verified: false,
    rating: 4.0,
    reviewCount: 3,
    lastActive: '1 hour ago'
  },
  {
    id: '6',
    name: 'Taylor Patel',
    age: 23,
    gender: 'Female',
    course: 'Arts',
    year: 'Graduate',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Grad student in arts looking for creative, social roommate.',
    preferences: {
      cleanliness: 'Relaxed',
      studyHabits: 'Moderate',
      sleepSchedule: 'Flexible',
      socialLevel: 'Very Social'
    },
    location: {
      current: 'Near Campus',
      preferred: 'Near Campus',
      maxDistance: 8,
      coords: { lat: 6.5220, lng: 3.3770 }
    },
    budget: {
      min: 450,
      max: 650,
      currency: 'USD'
    },
    interests: ['Painting', 'Music', 'Theater', 'Dancing'],
    contactInfo: {
      email: 'taylor.p@university.edu',
      phone: '+1234567895',
      social: {
        instagram: '@taylorarts',
        twitter: '@taylorpatel'
      }
    },
    verified: true,
    rating: 4.7,
    reviewCount: 15,
    lastActive: '3 days ago'
  },
  {
    id: '7',
    name: 'Casey Nguyen',
    age: 21,
    gender: 'Other',
    course: 'Engineering',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Engineering junior interested in sustainable living.',
    preferences: {
      cleanliness: 'Clean',
      studyHabits: 'Quiet',
      sleepSchedule: 'Night Owl',
      socialLevel: 'Moderate'
    },
    location: {
      current: 'Campus Area',
      preferred: 'Campus Area',
      maxDistance: 7,
      coords: { lat: 6.5280, lng: 3.3820 }
    },
    budget: {
      min: 550,
      max: 750,
      currency: 'USD'
    },
    interests: ['Sustainability', 'Coding', 'Cycling'],
    contactInfo: {
      email: 'casey.n@university.edu',
      phone: '+1234567896',
      social: {
        linkedin: 'casey-nguyen-eng'
      }
    },
    verified: false,
    rating: 4.5,
    reviewCount: 7,
    lastActive: '45 minutes ago'
  },
  {
    id: '8',
    name: 'Riley Thompson',
    age: 19,
    gender: 'Male',
    course: 'Psychology',
    year: '2nd Year',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Psych sophomore seeking balanced living arrangement.',
    preferences: {
      cleanliness: 'Moderate',
      studyHabits: 'Moderate',
      sleepSchedule: 'Early Bird',
      socialLevel: 'Social'
    },
    location: {
      current: 'Off-Campus',
      preferred: 'Off-Campus',
      maxDistance: 12,
      coords: { lat: 6.5400, lng: 3.3950 }
    },
    budget: {
      min: 350,
      max: 550,
      currency: 'USD'
    },
    interests: ['Sports', 'Reading', 'Travel'],
    contactInfo: {
      email: 'riley.t@university.edu',
      phone: '+1234567897',
      social: {
        twitter: '@rileypsych',
        instagram: '@rileythompson'
      }
    },
    verified: true,
    rating: 4.3,
    reviewCount: 9,
    lastActive: '2 days ago'
  },
  {
    id: '9',
    name: 'Morgan Garcia',
    age: 24,
    gender: 'Female',
    course: 'Business',
    year: 'Graduate',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'MBA student looking for professional, clean space.',
    preferences: {
      cleanliness: 'Very Clean',
      studyHabits: 'Quiet',
      sleepSchedule: 'Flexible',
      socialLevel: 'Private'
    },
    location: {
      current: 'Near Campus',
      preferred: 'Near Campus',
      maxDistance: 4,
      coords: { lat: 6.5230, lng: 3.3780 }
    },
    budget: {
      min: 700,
      max: 1000,
      currency: 'USD'
    },
    interests: [],
    contactInfo: {
      email: 'morgan.g@university.edu',
      phone: '+1234567898',
      social: {
        linkedin: 'morgan-garcia-mba'
      }
    },
    verified: true,
    rating: 4.9,
    reviewCount: 20,
    lastActive: '1 hour ago'
  },
  {
    id: '10',
    name: 'Drew Wilson',
    age: 20,
    gender: 'Male',
    course: 'Computer Science',
    year: '2nd Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'CS student who loves late-night coding sessions.',
    preferences: {
      cleanliness: 'Relaxed',
      studyHabits: 'Social',
      sleepSchedule: 'Night Owl',
      socialLevel: 'Very Social'
    },
    location: {
      current: 'Campus Dorms',
      preferred: 'Campus Dorms',
      maxDistance: 1,
      coords: { lat: 6.5240, lng: 3.3790 }
    },
    budget: {
      min: 250,
      max: 450,
      currency: 'USD'
    },
    interests: ['Coding', 'Gaming', 'Movies'],
    contactInfo: {
      email: 'drew.w@university.edu',
      phone: '+1234567899',
      social: {
        twitter: '@drewwilsoncs'
      }
    },
    verified: false,
    rating: 4.1,
    reviewCount: 4,
    lastActive: '30 minutes ago'
  },
  {
    id: '11',
    name: 'Quinn Rivera',
    age: 22,
    gender: 'Other',
    course: 'Medicine',
    year: '4th Year',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Senior med student seeking reliable roommate.',
    preferences: {
      cleanliness: 'Clean',
      studyHabits: 'Very Quiet',
      sleepSchedule: 'Early Bird',
      socialLevel: 'Moderate'
    },
    location: {
      current: 'Campus Area',
      preferred: 'Campus Area',
      maxDistance: 6,
      coords: { lat: 6.5260, lng: 3.3810 }
    },
    budget: {
      min: 500,
      max: 700,
      currency: 'USD'
    },
    interests: ['Medicine', 'Running', 'Books'],
    contactInfo: {
      email: 'quinn.r@university.edu',
      phone: '+1234567900',
      social: {
        instagram: '@quinnmed',
        linkedin: 'quinn-rivera-md'
      }
    },
    verified: true,
    rating: 4.6,
    reviewCount: 11,
    lastActive: '4 hours ago'
  },
  {
    id: '12',
    name: 'Blake Anderson',
    age: 21,
    gender: 'Male',
    course: 'Arts',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Art junior looking for creative and relaxed vibe.',
    preferences: {
      cleanliness: 'Moderate',
      studyHabits: 'Moderate',
      sleepSchedule: 'Flexible',
      socialLevel: 'Social'
    },
    location: {
      current: 'Off-Campus',
      preferred: 'Off-Campus',
      maxDistance: 20,
      coords: { lat: 6.5500, lng: 3.4000 }
    },
    budget: {
      min: 300,
      max: 500,
      currency: 'USD'
    },
    interests: ['Drawing', 'Music', 'Film'],
    contactInfo: {
      email: 'blake.a@university.edu',
      phone: '+1234567901',
      social: {
        instagram: '@blakeart',
        twitter: '@blakeanderson'
      }
    },
    verified: false,
    rating: 4.4,
    reviewCount: 6,
    lastActive: '6 hours ago'
  }
];