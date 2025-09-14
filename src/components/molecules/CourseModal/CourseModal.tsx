import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { X, Clock, MapPin, User, Calendar, BookOpen, Users, Mail, Award, GraduationCap, FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CourseModalProps } from './CourseModal.types';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';

export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  // State for managing dropdown toggles
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

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

  const getGradientClass = (color: string) => {
    // Always return black gradient for consistent professional look
    return 'bg-gradient-to-br from-gray-900 to-black';
  };

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out scale-100 animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={clsx('p-6 text-white relative overflow-hidden', getGradientClass(course.color))}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header content */}
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black mb-1 text-white">{course.code}</h2>
              <p className="text-white text-xl font-bold">{course.title}</p>
              <p className="text-white/90 text-sm mt-2 font-medium">{course.description}</p>
            </div>
          </div>

          {/* Course Info Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="bg-white/20 text-white border-white/30">
              <Award className="w-3 h-3 mr-1" />
              {course.credits} Credits
            </Badge>
            <Badge variant="default" className="bg-white/20 text-white border-white/30">
              <GraduationCap className="w-3 h-3 mr-1" />
              {course.department}
            </Badge>
            <Badge variant="default" className="bg-white/20 text-white border-white/30">
              <Calendar className="w-3 h-3 mr-1" />
              {course.semester} {course.year}
            </Badge>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* 2x2 Grid Layout */}
          <div className="space-y-8">
            {/* Top Row - 3 sections horizontally */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Schedule Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Schedule
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {course.schedule.startTime} - {course.schedule.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {course.schedule.days.join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {course.schedule.venue}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons - View on Map and View Notes side by side with white bg and black border */}
                  <div className="flex gap-3">
                    {/* View on Map Button */}
                    <button
                      onClick={() => console.log('View map for course:', course.id)}
                      className="flex-1 bg-white border-2 border-black hover:border-gray-800 text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md text-sm flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Map
                    </button>
                    
                    {/* View Notes Button */}
                    <button
                      onClick={() => console.log('View notes for course:', course.id)}
                      className="flex-1 bg-white border-2 border-black hover:border-gray-800 text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md text-sm flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      View Notes
                    </button>
                  </div>
                </div>
              </div>

              {/* Lecturer Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  Instructor
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={course.lecturer.avatar}
                      alt={course.lecturer.name}
                      size="md"
                      fallback={course.lecturer.name.split(' ').map(n => n[0]).join('')}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{course.lecturer.name}</h4>
                      <p className="text-sm text-gray-600">{course.lecturer.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <a 
                          href={`mailto:${course.lecturer.email}`}
                          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {course.lecturer.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gray-600" />
                  Course Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Course Code</div>
                    <div className="font-semibold text-gray-900">{course.code}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Credits</div>
                    <div className="font-semibold text-gray-900">{course.credits}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Department</div>
                    <div className="font-semibold text-gray-900">{course.department}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Semester</div>
                    <div className="font-semibold text-gray-900">{course.semester} {course.year}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - 2 sections horizontally */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Outline Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Course Outline
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="space-y-3">
                    {/* Module 1 */}
                    <div className="border-l-4 border-gray-800 pl-3">
                      <button
                        onClick={() => toggleModule('module1')}
                        className="w-full flex items-center justify-between text-left hover:bg-gray-100 p-2 rounded transition-colors"
                      >
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">Module 1: Introduction</h4>
                          <p className="text-xs text-gray-600">Basic concepts and fundamentals</p>
                          <div className="text-xs text-gray-500 mt-1">Week 1-2</div>
                        </div>
                        {expandedModules.module1 ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      {expandedModules.module1 && (
                        <div className="mt-2 pl-4 space-y-2 text-xs text-gray-600">
                          <div>• Introduction to programming concepts</div>
                          <div>• Variables and data types</div>
                          <div>• Basic control structures</div>
                          <div>• Problem-solving techniques</div>
                        </div>
                      )}
                    </div>

                    {/* Module 2 */}
                    <div className="border-l-4 border-gray-800 pl-3">
                      <button
                        onClick={() => toggleModule('module2')}
                        className="w-full flex items-center justify-between text-left hover:bg-gray-100 p-2 rounded transition-colors"
                      >
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">Module 2: Core Concepts</h4>
                          <p className="text-xs text-gray-600">Advanced topics and practical applications</p>
                          <div className="text-xs text-gray-500 mt-1">Week 3-6</div>
                        </div>
                        {expandedModules.module2 ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      {expandedModules.module2 && (
                        <div className="mt-2 pl-4 space-y-2 text-xs text-gray-600">
                          <div>• Object-oriented programming</div>
                          <div>• Data structures and algorithms</div>
                          <div>• File handling and I/O operations</div>
                          <div>• Error handling and debugging</div>
                        </div>
                      )}
                    </div>

                    {/* Module 3 */}
                    <div className="border-l-4 border-gray-800 pl-3">
                      <button
                        onClick={() => toggleModule('module3')}
                        className="w-full flex items-center justify-between text-left hover:bg-gray-100 p-2 rounded transition-colors"
                      >
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">Module 3: Advanced Topics</h4>
                          <p className="text-xs text-gray-600">Complex theories and real-world implementations</p>
                          <div className="text-xs text-gray-500 mt-1">Week 7-10</div>
                        </div>
                        {expandedModules.module3 ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      {expandedModules.module3 && (
                        <div className="mt-2 pl-4 space-y-2 text-xs text-gray-600">
                          <div>• Advanced algorithms and complexity</div>
                          <div>• Database design and management</div>
                          <div>• Web development fundamentals</div>
                          <div>• Software engineering principles</div>
                        </div>
                      )}
                    </div>

                    {/* Module 4 */}
                    <div className="border-l-4 border-gray-800 pl-3">
                      <button
                        onClick={() => toggleModule('module4')}
                        className="w-full flex items-center justify-between text-left hover:bg-gray-100 p-2 rounded transition-colors"
                      >
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">Module 4: Project & Assessment</h4>
                          <p className="text-xs text-gray-600">Final project and comprehensive evaluation</p>
                          <div className="text-xs text-gray-500 mt-1">Week 11-14</div>
                        </div>
                        {expandedModules.module4 ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      {expandedModules.module4 && (
                        <div className="mt-2 pl-4 space-y-2 text-xs text-gray-600">
                          <div>• Capstone project development</div>
                          <div>• Code review and testing</div>
                          <div>• Project presentation skills</div>
                          <div>• Final comprehensive examination</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md text-sm flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      View Full Syllabus
                    </button>
                  </div>
                </div>
              </div>

              {/* Past Questions Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  Past Questions & Practice Materials
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="grid gap-2">
                    <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-800 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Midterm Exam 2023</h4>
                          <p className="text-xs text-gray-600">Multiple choice and essay questions</p>
                        </div>
                        <div className="text-xs text-gray-500">PDF</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-800 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Final Exam 2023</h4>
                          <p className="text-xs text-gray-600">Comprehensive assessment with solutions</p>
                        </div>
                        <div className="text-xs text-gray-500">PDF</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-800 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Practice Quiz Set</h4>
                          <p className="text-xs text-gray-600">Interactive practice questions</p>
                        </div>
                        <div className="text-xs text-gray-500">Online</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-800 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Assignment Templates</h4>
                          <p className="text-xs text-gray-600">Sample assignments and rubrics</p>
                        </div>
                        <div className="text-xs text-gray-500">ZIP</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md text-sm flex items-center justify-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Browse All Materials
                    </button>
                  </div>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
