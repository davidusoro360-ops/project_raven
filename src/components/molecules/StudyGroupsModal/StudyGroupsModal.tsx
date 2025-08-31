import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { X, Users, Clock, MapPin, User, BookOpen, Calendar, Search, Filter, Plus } from 'lucide-react';
import { StudyGroupsModalProps, StudyGroup } from './StudyGroupsModal.types';

export const StudyGroupsModal: React.FC<StudyGroupsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All Levels');
  const [selectedSubject, setSelectedSubject] = useState<string>('All Course');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Location');
  const [activeTab, setActiveTab] = useState<'discover' | 'myGroups' | 'create'>('discover');

  // Mock data for study groups
  useEffect(() => {
    if (isOpen) {
      setStudyGroups([
        {
          id: '1',
          subject: 'CS101',
          topic: 'Intro to Computer Science',
          date: 'Today',
          time: '3:00 PM - 5:00 PM',
          location: 'Library Room 204',
          participants: 4,
          maxParticipants: 8,
          organizer: 'Sarah Johnson',
          description: 'Focused group for CS101 - Intro to Computer Science fundamentals.',
          level: 'Beginner',
          isJoined: false,
        },
        {
          id: '2',
          subject: 'MTH102',
          topic: 'Calculus II',
          date: 'Tomorrow',
          time: '2:00 PM - 4:00 PM',
          location: 'Study Hall A',
          participants: 6,
          maxParticipants: 10,
          organizer: 'Mike Chen',
          description: 'Advanced calculus study group focusing on integration techniques.',
          level: 'Intermediate',
          isJoined: true,
        },
        {
          id: '3',
          subject: 'PHY201',
          topic: 'Physics II',
          date: 'Dec 16',
          time: '1:00 PM - 3:00 PM',
          location: 'Science Lab',
          participants: 3,
          maxParticipants: 6,
          organizer: 'Alex Rivera',
          description: 'Physics II study group covering electromagnetism and optics.',
          level: 'Advanced',
          isJoined: false,
        },
      ]);
    }
  }, [isOpen]);

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

  const handleJoinGroup = (groupId: string) => {
    setStudyGroups(prev => 
      prev.map(group => 
        group.id === groupId 
          ? { ...group, isJoined: !group.isJoined, participants: group.isJoined ? group.participants - 1 : group.participants + 1 }
          : group
      )
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and search logic
  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === 'All Levels' || group.level === selectedLevel;
    const matchesSubject = selectedSubject === 'All Course' || group.subject === selectedSubject;
    const matchesLocation = selectedLocation === 'All Location' || group.location === selectedLocation;
    
    return matchesSearch && matchesLevel && matchesSubject && matchesLocation;
  });

  // Get unique options for filters
  const subjects = ['All Course', ...Array.from(new Set(studyGroups.map(group => group.subject)))];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const locations = ['All Location', ...Array.from(new Set(studyGroups.map(group => group.location)))];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-lg animate-fade-in"
        onClick={onClose}
      />

      {/* Enhanced Modal Container - Fixed Height */}
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
              <Users className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Study Groups</h2>
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
                onClick={() => setActiveTab('myGroups')}
                className={clsx(
                  'relative px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group',
                  activeTab === 'myGroups'
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                )}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>My Groups</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    2
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('create')}
                className={clsx(
                  'relative px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group',
                  activeTab === 'create'
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                )}
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Create</span>
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
                    placeholder="Search groups..."
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
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="px-3 py-2 bg-white border border-black rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800/20 focus:border-gray-800 transition-all duration-200 hover:border-gray-800 appearance-none cursor-pointer"
                      >
                        {subjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>

                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="px-3 py-2 bg-white border border-black rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800/20 focus:border-gray-800 transition-all duration-200 hover:border-gray-800 appearance-none cursor-pointer"
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
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
                        <span>{filteredGroups.length} groups found</span>
                      </div>

                      {(searchTerm || selectedLevel !== 'All Levels' || selectedSubject !== 'All Course' || selectedLocation !== 'All Location') && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedLevel('All Levels');
                            setSelectedSubject('All Course');
                            setSelectedLocation('All Location');
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              {/* Enhanced Study Groups Grid - Compact Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredGroups.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50"></div>
                      </div>
                      <Users className="relative w-8 h-8 text-gray-400 mx-auto mb-4" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No study groups found</h3>
                    <p className="text-gray-600 max-w-md mx-auto text-sm">
                      Try adjusting your search criteria or filters, or create a new study group.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg hover:from-gray-900 hover:to-black transition-all duration-200 shadow-sm hover:shadow-md text-sm">
                      Create New Group
                    </button>
                  </div>
                ) : (
                  filteredGroups.map((group) => (
                    <div key={group.id} className="group bg-white border border-black rounded-xl p-4 hover:shadow-lg hover:border-gray-800 transition-all duration-300 hover:scale-[1.01] relative overflow-hidden">
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Group Header */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="p-1.5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg group-hover:from-gray-800 group-hover:to-gray-900 transition-colors duration-300">
                                <BookOpen className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <h3 className="text-base font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">{group.subject}</h3>
                            </div>
                            <p className="text-gray-700 font-medium text-sm">{group.topic}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={clsx(
                              'px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all duration-200 group-hover:scale-105',
                              getLevelColor(group.level)
                            )}>
                              {group.level}
                            </span>
                            {group.isJoined && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Joined
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Group Description */}
                        <p className="text-gray-600 text-xs mb-3 leading-relaxed line-clamp-2">{group.description}</p>

                        {/* Enhanced Group Details */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                              <Calendar className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="font-medium">{group.date} • {group.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                              <MapPin className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="font-medium">{group.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                              <User className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="font-medium">By {group.organizer}</span>
                          </div>
                        </div>

                        {/* Enhanced Participants and Action */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 group-hover:border-gray-800 transition-colors duration-300">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                              <div className="p-1 bg-gray-100 rounded group-hover:bg-gray-800 transition-colors duration-300">
                                <Users className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <span>{group.participants}/{group.maxParticipants}</span>
                            </div>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-gray-700 to-gray-900 transition-all duration-300"
                                style={{ width: `${(group.participants / group.maxParticipants) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleJoinGroup(group.id)}
                            className={clsx(
                              'px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95',
                              group.isJoined
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                                : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black'
                            )}
                          >
                            {group.isJoined ? 'Leave' : 'Join'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === 'myGroups' && (
            <div className="space-y-8">
              {/* My Groups Header */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 scale-150"></div>
                  <div className="relative p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Your Study Groups</h3>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  Manage your active study groups and track your learning progress with fellow students.
                </p>
              </div>

              {/* Active Groups Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">2</div>
                  <div className="text-sm text-green-600 font-medium">Active Groups</div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800">15</div>
                  <div className="text-sm text-gray-600 font-medium">Study Hours</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700">8</div>
                  <div className="text-sm text-purple-600 font-medium">Connections</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-900 hover:to-black transition-all duration-200 shadow-lg hover:shadow-xl">
                  View All Groups
                </button>
                <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-800 hover:text-gray-900 transition-all duration-200">
                  Study Schedule
                </button>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="space-y-8">
              {/* Create Group Header */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 scale-150"></div>
                  <div className="relative p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Create New Study Group</h3>
                <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
                  Start your own study community, set learning goals, and invite fellow students to join your academic journey.
                </p>
              </div>

              {/* Create Group Form Preview */}
              <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Course Subject</label>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
                        e.g., CS101, MTH102
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
                        Beginner, Intermediate, Advanced
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Group Description</label>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 h-20 flex items-center">
                      Describe your study group goals and topics...
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Location</label>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
                        Library, Online, etc.
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Max Members</label>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
                        4-12 members
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                  <button className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-xl hover:from-gray-900 hover:to-black transition-all duration-200 shadow-lg hover:shadow-xl">
                    Create Study Group
                  </button>
                  <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-800 hover:text-gray-900 transition-all duration-200">
                    Save as Draft
                  </button>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-gray-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Build Community</h4>
                  <p className="text-sm text-gray-600">Connect with like-minded students</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Share Knowledge</h4>
                  <p className="text-sm text-gray-600">Learn together and teach others</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-gray-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Stay Organized</h4>
                  <p className="text-sm text-gray-600">Structure your study schedule</p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};
