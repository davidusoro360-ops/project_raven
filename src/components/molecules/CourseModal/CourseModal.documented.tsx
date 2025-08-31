/**
 * CourseModal Component
 * 
 * A comprehensive modal component that displays detailed course information
 * including schedule, instructor details, course outline, and practice materials.
 * 
 * @example
 * ```tsx
 * <CourseModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   course={selectedCourse}
 * />
 * ```
 * 
 * @component
 * @version 1.0.0
 * @author Rayven Development Team
 */

import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { X, Clock, MapPin, User, Calendar, BookOpen, Users, Mail, Award, GraduationCap, FileText, HelpCircle } from 'lucide-react';
import { CourseModalProps } from './CourseModal.types';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';

/**
 * CourseModal functional component
 * 
 * @param props - The component props
 * @param props.isOpen - Controls modal visibility
 * @param props.onClose - Callback function when modal is closed
 * @param props.course - Course data to display in modal
 * @returns JSX.Element | null
 */
export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  /**
   * Effect hook to handle modal keyboard interactions and body scroll
   * Adds escape key listener and prevents body scroll when modal is open
   */
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

  /**
   * Generates consistent gradient class names for course color themes
   * Always returns black gradient for professional appearance
   * 
   * @param color - The course color identifier
   * @returns CSS class name for gradient background
   */
  const getGradientClass = (color: string): string => {
    // Always return black gradient for consistent professional look
    return 'bg-gradient-to-br from-gray-900 to-black';
  };

  // Early return if modal should not be displayed
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fade-in"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* Main modal container */}
      <div 
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out scale-100 animate-slide-up max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
      >
        {/* Modal header with course branding */}
        <div className={clsx('p-6 text-white relative overflow-hidden', getGradientClass(course.color))}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
            aria-label="Close course modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Course header content */}
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 id="course-modal-title" className="text-3xl font-black mb-1 text-white">
                {course.code}
              </h2>
              <p className="text-white text-xl font-bold">{course.title}</p>
              <p className="text-white/90 text-sm mt-2 font-medium">{course.description}</p>
            </div>
          </div>

          {/* Course information badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Award className="w-3 h-3 mr-1" />
              {course.credits} Credits
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <GraduationCap className="w-3 h-3 mr-1" />
              {course.department}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Calendar className="w-3 h-3 mr-1" />
              {course.semester} {course.year}
            </Badge>
          </div>

          {/* Decorative background elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </div>

        {/* Modal content sections */}
        <div className="p-6">
          {/* 2x2 Grid Layout for course information */}
          <div className="space-y-8">
            {/* Top Row - 3 sections horizontally */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Schedule Section */}
              <section>
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
                  
                  {/* View on Map Button */}
                  <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md text-sm flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    View on Map
                  </button>
                </div>
              </section>
              
              {/* Additional sections would continue here... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
