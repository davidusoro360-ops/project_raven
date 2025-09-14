// Dashboard.tsx - Main dashboard component with navigation, quick links, announcements, and right sidebar
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Grid3X3, Users, HomeIcon, Video, CalendarDays, Edit, Briefcase, DollarSign, Award, BookOpen } from 'lucide-react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { CourseCard } from '@/components/molecules/CourseCard';
import { AnnouncementCard } from '@/components/molecules/AnnouncementCard';
import { AnnouncementModal } from '@/components/molecules/AnnouncementModal';
import { StudyGroupsModal } from '@/components/molecules/StudyGroupsModal';
import { CourseModal } from '@/components/molecules/CourseModal';
import { BookHub } from '@/components/molecules/BookHub';
import { QuickLinks } from '@/components/molecules/QuickLinks';
import { UpcomingEventsCard } from '@/components/molecules/UpcomingEventsCard';
import { CourseMatesChat } from '@/components/molecules/CourseMatesChat';
import { Avatar } from '@/components/atoms/Avatar';
import { NavigationItem } from '@/components/organisms/Sidebar';
import { Course } from '@/types';

// Mock data
const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
    href: '/',
    active: true,
  },
  {
    id: 'more',
    label: 'More',
    icon: <Grid3X3 className="w-5 h-5" />,
    href: '/more',
  },
  {
    id: 'sign-documents',
    label: 'Sign Documents',
    icon: <Edit className="w-5 h-5" />,
    href: '/sign-documents',
    active: false,
  },
  // Career and gig navigation items for easy extension
  {
    id: 'view-jobs',
    label: 'View Jobs',
    icon: <Briefcase className="w-5 h-5" />,
    href: '/jobs',
    active: false,
  },
  {
    id: 'side-gigs',
    label: 'Side Gigs',
    icon: <DollarSign className="w-5 h-5" />,
    href: '/side-gigs',
    active: false,
  },
  // Financial aid navigation for scholarships - easily extensible
  {
    id: 'scholarships',
    label: 'View Available Scholarships',
    icon: <Award className="w-5 h-5" />,
    href: '/scholarships',
    active: false,
  },
];

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CSC101',
    title: 'Intro to Computer Science',
    description: 'Introduction to programming and computer science concepts',
    credits: 3,
    department: 'Computer Science',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '8:00 AM',
      endTime: '10:00 AM',
      venue: 'Room 12',
      days: ['Monday', 'Wednesday', 'Friday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '1',
      name: 'Dr. Smith',
      title: 'Professor',
      email: 'dr.smith@university.edu',
    },
    color: 'purple',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    code: 'MTH102',
    title: 'Calculus II',
    description: 'Advanced calculus concepts and applications',
    credits: 4,
    department: 'Mathematics',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      venue: 'Lecture Hall B',
      days: ['Tuesday', 'Thursday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '2',
      name: 'Prof. J. Adewale',
      title: 'Professor',
      email: 'j.adewale@university.edu',
    },
    color: 'blue',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '3',
    code: 'ENG204',
    title: 'Technical Writing',
    description: 'Professional and technical writing skills',
    credits: 2,
    department: 'English',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '3:00 PM',
      endTime: '4:30 PM',
      venue: 'Room 12',
      days: ['Monday', 'Wednesday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '3',
      name: 'Mrs. L. Okoro',
      title: 'Associate Professor',
      email: 'l.okoro@university.edu',
    },
    color: 'indigo',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '4',
    code: 'PHY111',
    title: 'General Physics I',
    description: 'Mechanics, thermodynamics, and wave motion',
    credits: 4,
    department: 'Physics',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      venue: 'Science Lab A',
      days: ['Monday', 'Wednesday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '4',
      name: 'Dr. Wilson',
      title: 'Professor',
      email: 'dr.wilson@university.edu',
    },
    color: 'purple',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '5',
    code: 'BIO201',
    title: 'Cell Biology',
    description: 'Structure and function of cells and cellular processes',
    credits: 4,
    department: 'Biology',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '1:00 PM',
      endTime: '3:00 PM',
      venue: 'Biology Lab 3',
      days: ['Monday', 'Wednesday', 'Friday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '5',
      name: 'Dr. Martinez',
      title: 'Professor',
      email: 'dr.martinez@university.edu',
    },
    color: 'blue',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '6',
    code: 'CHEM151',
    title: 'General Chemistry',
    description: 'Fundamental principles of chemistry and laboratory techniques',
    credits: 4,
    department: 'Chemistry',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      venue: 'Chemistry Lab 2',
      days: ['Tuesday', 'Thursday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '6',
      name: 'Prof. Anderson',
      title: 'Associate Professor',
      email: 'prof.anderson@university.edu',
    },
    color: 'indigo',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '7',
    code: 'HIST205',
    title: 'World History',
    description: 'Survey of world civilizations and historical developments',
    credits: 3,
    department: 'History',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      venue: 'Humanities Hall 1',
      days: ['Monday', 'Wednesday', 'Friday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '7',
      name: 'Prof. Thompson',
      title: 'Professor',
      email: 'prof.thompson@university.edu',
    },
    color: 'purple',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '8',
    code: 'ART150',
    title: 'Digital Art Fundamentals',
    description: 'Introduction to digital art creation and design principles',
    credits: 3,
    department: 'Art',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      venue: 'Art Studio 3',
      days: ['Tuesday', 'Thursday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '8',
      name: 'Ms. Rodriguez',
      title: 'Associate Professor',
      email: 'ms.rodriguez@university.edu',
    },
    color: 'blue',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '9',
    code: 'PSYC101',
    title: 'Introduction to Psychology',
    description: 'Basic principles of human behavior and mental processes',
    credits: 3,
    department: 'Psychology',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '1:00 PM',
      endTime: '2:30 PM',
      venue: 'Psychology Building 201',
      days: ['Monday', 'Wednesday', 'Friday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '9',
      name: 'Dr. Foster',
      title: 'Professor',
      email: 'dr.foster@university.edu',
    },
    color: 'indigo',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '10',
    code: 'PSY112',
    title: 'Cognitive Psychology',
    description: 'Study of mental processes including perception, memory, and thinking',
    credits: 3,
    department: 'Psychology',
    semester: 'Fall',
    year: 2024,
    schedule: {
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      venue: 'Psychology Building 105',
      days: ['Tuesday', 'Thursday'],
      timezone: 'UTC',
    },
    lecturer: {
      id: '10',
      name: 'Dr. Sarah Chen',
      title: 'Associate Professor',
      email: 'dr.chen@university.edu',
    },
    color: 'purple',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

const mockBooks = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 25,
    condition: 'like-new' as const,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert Martin',
    price: 35,
    condition: 'good' as const,
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas',
    price: 30,
    condition: 'new' as const,
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Design Patterns',
    author: 'Gang of Four',
    price: 40,
    condition: 'good' as const,
    cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop',
  },
];

// Mock data for Course Mates Chat - adapted from specialists for course mates
const chatCategories = [
  {
    id: '1',
    title: 'CSC101 Classmates',
    count: 6,
    mates: [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '3',
        name: 'Mike Brown',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '8',
        name: 'Anna Lee',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '9',
        name: 'Tom Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '12',
        name: 'Emily Davis',
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      },
    ],
  },
  {
    id: '2',
    title: 'MTH102 Study Group',
    count: 8,
    mates: [
      {
        id: '4',
        name: 'Dr. Davis',
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '5',
        name: 'Lisa Chen',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '6',
        name: 'Robert Taylor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '7',
        name: 'Emma Garcia',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '10',
        name: 'James Kim',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '11',
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '13',
        name: 'David Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
      {
        id: '14',
        name: 'Sophie Kim',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
    ],
  },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isStudyGroupsModalOpen, setIsStudyGroupsModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleViewMap = (courseId: string) => {
    console.log('View map for course:', courseId);
    // TODO: Implement AR navigation
  };

  const handleAnnouncementClick = () => {
    setIsAnnouncementModalOpen(true);
  };

  const handleCloseAnnouncementModal = () => {
    setIsAnnouncementModalOpen(false);
  };

  const handleStudyGroupsClick = () => {
    setIsStudyGroupsModalOpen(true);
  };

  const handleCloseStudyGroupsModal = () => {
    setIsStudyGroupsModalOpen(false);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
  };

  const handleCloseCourseModal = () => {
    setIsCourseModalOpen(false);
    setSelectedCourse(null);
  };

  // Quick Links data - moved inside component to access handlers
  const quickLinks = [
    {
      id: '1',
      title: 'Study Groups',
      description: 'Join study sessions',
      icon: <Users className="w-6 h-6 text-gray-900" />,
      onClick: handleStudyGroupsClick,
    },
    {
      id: '2',
      title: 'Find Roommate',
      description: 'Connect with peers',
      icon: <HomeIcon className="w-6 h-6 text-gray-900" />,
      onClick: () => navigate('/roommates'),
    },
    {
      id: '3',
      title: 'View Class Streams',
      description: 'Watch live classes',
      icon: <Video className="w-6 h-6 text-gray-900" />,
      onClick: () => console.log('View Class Streams clicked'),
    },
    {
      id: '4',
      title: 'Find Tutorials/Tutors',
      description: 'Access learning resources',
      icon: <BookOpen className="w-6 h-6 text-gray-900" />,
      onClick: () => navigate('/tutors'),
    },
    {
      id: '5',
      title: 'View Jobs',
      description: 'Explore career opportunities',
      icon: <Briefcase className="w-6 h-6 text-gray-900" />,
      onClick: () => navigate('/jobs'),
    },
    {
      id: '6',
      title: 'Side Gigs',
      description: 'Find freelance work',
      icon: <DollarSign className="w-6 h-6 text-gray-900" />,
      onClick: () => navigate('/side-gigs'),
    },
  ];

  const rightSidebar = (
    <div className="space-y-6">
      <CourseMatesChat categories={chatCategories} />
      <BookHub books={mockBooks} />
    </div>
  );

  return (
    <DashboardLayout
      navigationItems={navigationItems}
      rightSidebar={rightSidebar}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Hello, Jasmin
            </h1>
            <p className="text-sm text-gray-600">
              lets know your thoughts!!!
            </p>
          </div>
          <Avatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Jasmin"
            size="lg"
            fallback="JA"
            className="flex-shrink-0"
          />
        </div>

        {/* Tailored for you Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            tailored for you
          </h2>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {mockCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewMap={handleViewMap}
                onClick={handleCourseClick}
                className="flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Announcements Section - Enhanced Professional Design */}
        <section className="space-y-5">
          {/* Section Header with Enhanced Typography */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Announcements
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Stay updated with important notices
              </p>
            </div>
          </div>

          {/* Featured Announcement */}
          <div className="relative">
            <AnnouncementCard
              title="PHY 111 Test Tomorrow"
              subtitle="Final examination - Science Lab A"
              badge="URGENT"
              countdown="18h 32m"
              onClick={handleAnnouncementClick}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            />

            {/* Priority Indicator */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
          </div>

          {/* Enhanced Action Buttons - Compact side-by-side layout for announcements and timetable */}
          <div className="relative flex gap-3">
            {/* View All Announcements Button - Shortened with black border */}
            <button
              onClick={() => navigate('/announcements')}
              className="group flex-1 flex items-center justify-between py-3 px-4 bg-white rounded-lg transition-all duration-300 ease-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-[0.98] border-2 border-black hover:border-gray-800 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300 border border-black">
                  <svg className="w-4 h-4 text-black group-hover:text-gray-800 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    View All Announcements
                  </span>
                  <span className="text-xs text-gray-500">
                    4 new
                  </span>
                </div>
              </div>
              <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* View Timetable Button - Compact with black border */}
            <button
              onClick={() => navigate('/schedule')}
              className="flex items-center justify-center py-3 px-4 bg-white rounded-lg transition-all duration-300 ease-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-[0.98] border-2 border-black hover:border-gray-800 min-w-[120px]"
            >
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-black group-hover:text-gray-800" />
                <span className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  View Timetable
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Quick Links Section */}
        <QuickLinks links={quickLinks} />

        {/* Upcoming Events Card with black border */}
        <UpcomingEventsCard 
          className="border-2 border-black rounded-xl"
          onEventClick={(eventId: string) => console.log('Event clicked:', eventId)}
        />
      </div>

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={handleCloseAnnouncementModal}
        title="PHY 111 Test Tomorrow"
        subtitle="Final examination - Science Lab A"
        badge="URGENT"
        countdown="18h 32m"
        description="This is a comprehensive final examination covering all topics from chapters 1-12. Please bring your calculator, pencils, and student ID. The exam will be held in Science Lab A and will last for 2 hours. Late arrivals will not be permitted after 15 minutes."
        location="Science Lab A, Building 3, Room 201"
        instructor="Dr. Sarah Johnson"
        priority="urgent"
      />

      {/* Study Groups Modal */}
      <StudyGroupsModal
        isOpen={isStudyGroupsModalOpen}
        onClose={handleCloseStudyGroupsModal}
      />

      {/* Course Modal */}
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={handleCloseCourseModal}
        course={selectedCourse}
      />

    </DashboardLayout>
  );
};
