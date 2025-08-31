import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { X, Search, Filter, Users, MapPin, DollarSign, Star, MessageCircle, Heart, User, Home, BookOpen, Clock, Shield, Phone, Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
import { RoommateModalProps, Roommate } from './RoommateModal.types';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';

// Mock data for roommates
const mockRoommates: Roommate[] = [
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

export const RoommateModal: React.FC<RoommateModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'discover' | 'matches' | 'profile'>('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  // New: local state for likes and connections (persisted via localStorage)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [connections, setConnections] = useState<Record<string, string>>({});

  // Filter options
  const genders = ['All', 'Male', 'Female', 'Other'];
  const courses = ['All Courses', 'Computer Science', 'Engineering', 'Psychology', 'Business', 'Medicine', 'Arts'];
  const years = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];
  const locations = ['All Locations', 'Campus Dorms', 'Near Campus', 'Off-Campus', 'Campus Area'];

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // New: load likes and connections from localStorage once
  useEffect(() => {
    try {
      const storedLikes = JSON.parse(localStorage.getItem('roommateLikes') || '[]') as string[];
      setLikedIds(new Set(storedLikes));
      const storedConnections = JSON.parse(localStorage.getItem('roommateConnections') || '{}') as Record<string, string>;
      setConnections(storedConnections);
    } catch {}
  }, []);

  // Filter roommates
  const filteredRoommates = mockRoommates.filter(roommate => {
    const matchesSearch = roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roommate.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roommate.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = selectedGender === 'All' || roommate.gender === selectedGender;
    const matchesCourse = selectedCourse === 'All Courses' || roommate.course === selectedCourse;
    const matchesYear = selectedYear === 'All Years' || roommate.year === selectedYear;
    const matchesLocation = selectedLocation === 'All Locations' || 
                           roommate.location.current === selectedLocation || 
                           roommate.location.preferred === selectedLocation;
    
    return matchesSearch && matchesGender && matchesCourse && matchesYear && matchesLocation;
  });

 // New: derived data for matches tab and display
 const matchesCount = Object.keys(connections).length;
 const connectedRoommates = mockRoommates.filter(r => connections[r.id]);

 // New: relative time formatter for connected timestamp
 const formatRelative = (iso: string) => {
   const now = Date.now();
   const then = new Date(iso).getTime();
   const diff = Math.max(0, Math.floor((now - then) / 1000));
   if (diff < 60) return `${diff}s ago`;
   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
   const d = Math.floor(diff / 86400);
   return `${d}d ago`;
 };

  const handleConnect = (roommateId: string) => {
    setConnections(prev => {
      const next = { ...prev };
      if (next[roommateId]) {
        delete next[roommateId];
      } else {
        next[roommateId] = new Date().toISOString();
      }
      try {
        localStorage.setItem('roommateConnections', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleLike = (roommateId: string) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(roommateId)) {
        next.delete(roommateId);
      } else {
        next.add(roommateId);
      }
      try {
        localStorage.setItem('roommateLikes', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-lg animate-fade-in"
        onClick={onClose}
      />
      
      {/* Enhanced Modal Container */}
      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out scale-100 animate-slide-up h-[85vh] flex flex-col border border-gray-200/50">
        {/* Simplified Header */}
        <div className="bg-white border-b border-black p-4 relative flex-shrink-0">
          {/* Enhanced Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 group"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>

          {/* Simple Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-sm">
              <Home className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Find Roommate</h2>
          </div>
        </div>

        {/* Enhanced Tabs with Search Bar */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-black flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-3 gap-6">
            {/* Tabs Section */}
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('discover')}
                className={clsx(
                  'relative px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group',
                  activeTab === 'discover'
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                )}
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Discover</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('matches')}
                className={clsx(
                  'relative px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group',
                  activeTab === 'matches'
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                )}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Matches</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {matchesCount}
                  </span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={clsx(
                  'relative px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group',
                  activeTab === 'profile'
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                )}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </div>
              </button>
            </div>

            {/* Search and Filter Section - Only show on Discover tab */}
            {activeTab === 'discover' && (
              <div className="flex items-center gap-3 flex-1 max-w-2xl">
                {/* Search Bar */}
                <div className="flex-1 relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200">
                    <Search className="w-4 h-4 text-gray-400 group-focus-within:text-gray-800" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search roommates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-black rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-800/20 focus:border-gray-800 transition-all duration-200 hover:border-gray-800"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  )}
                </div>
                
                {/* Advanced Filter Button */}
                <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-black hover:border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group whitespace-nowrap">
                  <Filter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeTab === 'discover' && (
              <>
                {/* Compact Filter Dropdowns */}
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <select
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        className="px-3 py-2 bg-white border border-black rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800/20 focus:border-gray-800 transition-all duration-200 hover:border-gray-800 appearance-none cursor-pointer"
                      >
                        {genders.map(gender => (
                          <option key={gender} value={gender}>{gender}</option>
                        ))}
                      </select>
                      
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="px-3 py-2 bg-white border border-black rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800/20 focus:border-gray-800 transition-all duration-200 hover:border-gray-800 appearance-none cursor-pointer"
                      >
                        {courses.map(course => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                      
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-3 py-2 bg-white border border-black rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800/20 focus:border-gray-800 transition-all duration-200 hover:border-gray-800 appearance-none cursor-pointer"
                      >
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="px-3 py-2 bg-white border border-black rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800/20 focus:border-gray-800 transition-all duration-200 hover:border-gray-800 appearance-none cursor-pointer"
                      >
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>

                    {/* Results Summary */}
                    <div className="flex items-center gap-3 ml-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{filteredRoommates.length} roommates found</span>
                      </div>
                      
                      {(searchTerm || selectedGender !== 'All' || selectedCourse !== 'All Courses' || selectedYear !== 'All Years' || selectedLocation !== 'All Locations') && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedGender('All');
                            setSelectedCourse('All Courses');
                            setSelectedYear('All Years');
                            setSelectedLocation('All Locations');
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Roommate Cards Grid - Compact Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filteredRoommates.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50"></div>
                        </div>
                        <Users className="relative w-8 h-8 text-gray-400 mx-auto mb-4" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">No roommates found</h3>
                      <p className="text-gray-600 max-w-md mx-auto text-sm">
                        Try adjusting your search criteria or filters to find potential roommates.
                      </p>
                    </div>
                  ) : (
                    filteredRoommates.map((roommate) => (
                      <div key={roommate.id} className="group bg-white border border-black rounded-xl p-4 hover:shadow-lg hover:border-gray-800 transition-all duration-300 hover:scale-[1.01] relative overflow-hidden">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Card Content */}
                        <div className="relative z-10">
                          {/* Header with Avatar and Basic Info */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar
                                  src={roommate.avatar}
                                  alt={roommate.name}
                                  size="md"
                                  fallback={roommate.name.split(' ').map(n => n[0]).join('')}
                                />
                                {roommate.verified && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-2.5 h-2.5 text-white" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="text-base font-bold text-gray-900">{roommate.name}</h3>
                                <p className="text-sm text-gray-600">{roommate.age} years • {roommate.gender}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-gray-600">{roommate.rating} ({roommate.reviewCount})</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              <Badge
                                variant={roommate.verified ? 'success' : 'secondary'}
                                size="sm"
                                className="text-xs"
                              >
                                {roommate.verified ? 'Verified' : 'Unverified'}
                              </Badge>
                              <span className="text-xs text-gray-500">{roommate.lastActive}</span>
                            </div>
                          </div>

                          {/* Course and Year */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                              <BookOpen className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="text-xs font-medium text-gray-700">{roommate.course} • {roommate.year}</span>
                          </div>

                          {/* Bio */}
                          <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">{roommate.bio}</p>

                          {/* Preferences */}
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center gap-2 text-xs text-gray-700">
                              <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                                <Home className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <span>{roommate.preferences.cleanliness} • {roommate.preferences.studyHabits}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-700">
                              <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                                <Clock className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <span>{roommate.preferences.sleepSchedule} • {roommate.preferences.socialLevel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-700">
                              <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                                <MapPin className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <span>{roommate.location.preferred} (within {roommate.location.maxDistance}km)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-700">
                              <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                                <DollarSign className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <span>{roommate.budget.currency} {roommate.budget.min}-{roommate.budget.max}/month</span>
                            </div>
                          </div>

                          {/* Interests */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {roommate.interests.slice(0, 3).map((interest, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {interest}
                              </span>
                            ))}
                            {roommate.interests.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                +{roommate.interests.length - 3} more
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100 group-hover:border-gray-800 transition-colors duration-300">
                            <button
                              onClick={() => handleLike(roommate.id)}
                              className={clsx(
                                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200",
                                likedIds.has(roommate.id)
                                  ? "text-red-600 bg-red-50"
                                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                              )}
                            >
                              <Heart className={clsx("w-3 h-3", likedIds.has(roommate.id) && "fill-current text-red-600")} />
                              {likedIds.has(roommate.id) ? "Liked" : "Like"}
                            </button>

                            <button
                              onClick={() => handleConnect(roommate.id)}
                              className={clsx(
                                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95",
                                connections[roommate.id]
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black"
                              )}
                            >
                              {connections[roommate.id] ? "Connected" : "Connect"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === 'matches' && (
              <div className="space-y-6">
                {/* Matches Header */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 scale-150"></div>
                    <div className="relative p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Your Matches</h3>
                  <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                    People who liked you back and potential roommate connections.
                  </p>
                </div>

                {/* Match Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-pink-50 to-red-50 border border-pink-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-pink-700">3</div>
                    <div className="text-sm text-pink-600 font-medium">Mutual Likes</div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">8</div>
                    <div className="text-sm text-gray-600 font-medium">Profile Views</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">2</div>
                    <div className="text-sm text-green-600 font-medium">Active Chats</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-900 hover:to-black transition-all duration-200 shadow-lg hover:shadow-xl">
                    View All Matches
                  </button>
                  <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-800 hover:text-gray-900 transition-all duration-200">
                    Message Center
                  </button>
                </div>

                {/* Connected list */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Connected Roommates</h4>
                  {connectedRoommates.length === 0 ? (
                    <div className="text-center text-gray-600 text-sm">
                      No connections yet. Go to Discover and press Connect.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {connectedRoommates.map((r) => (
                        <div key={r.id} className="bg-white border border-black rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={r.avatar}
                              alt={r.name}
                              size="md"
                              fallback={r.name.split(' ').map(n => n[0]).join('')}
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-sm">{r.name}</div>
                              <div className="text-xs text-gray-600">{r.course} • {r.year}</div>
                              <div className="text-xs text-gray-500">Connected {formatRelative(connections[r.id])}</div>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-700">
                            {r.contactInfo.email && (
                              <a className="inline-flex items-center gap-1 hover:underline" href={`mailto:${r.contactInfo.email}`}>
                                <Mail className="w-3 h-3" /> {r.contactInfo.email}
                              </a>
                            )}
                            {r.contactInfo.phone && (
                              <a className="inline-flex items-center gap-1 hover:underline" href={`tel:${r.contactInfo.phone}`}>
                                <Phone className="w-3 h-3" /> {r.contactInfo.phone}
                              </a>
                            )}
                            {r.contactInfo.social?.instagram && (
                              <span className="inline-flex items-center gap-1">
                                <Instagram className="w-3 h-3" /> {r.contactInfo.social.instagram}
                              </span>
                            )}
                            {r.contactInfo.social?.twitter && (
                              <span className="inline-flex items-center gap-1">
                                <Twitter className="w-3 h-3" /> {r.contactInfo.social.twitter}
                              </span>
                            )}
                            {r.contactInfo.social?.linkedin && (
                              <span className="inline-flex items-center gap-1">
                                <Linkedin className="w-3 h-3" /> {r.contactInfo.social.linkedin}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 scale-150"></div>
                    <div className="relative p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">My Roommate Profile</h3>
                  <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
                    Complete your profile to get better matches and increase your chances of finding the perfect roommate.
                  </p>
                </div>

                {/* Profile Completion */}
                <div className="max-w-2xl mx-auto bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Profile Completion</h4>
                    <span className="text-sm font-medium text-gray-600">75% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-green-800">Basic Information</span>
                      </div>
                      <span className="text-xs text-green-600">Complete</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Clock className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-yellow-800">Preferences & Lifestyle</span>
                      </div>
                      <span className="text-xs text-yellow-600">In Progress</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Photos & Verification</span>
                      </div>
                      <span className="text-xs text-gray-500">Pending</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-900 hover:to-black transition-all duration-200 shadow-lg hover:shadow-xl">
                    Complete Profile
                  </button>
                  <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-800 hover:text-gray-900 transition-all duration-200">
                    Preview Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
