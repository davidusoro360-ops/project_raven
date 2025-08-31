import React from 'react';
import { clsx } from 'clsx';
import {
  MapPin, Clock, User, Brain, Computer, Calculator, Atom, Beaker, Dna,
  ScrollText, Palette, BookOpen, Microscope, FlaskConical, Binary,
  PieChart, Lightbulb, Brush, Globe, Music, Languages, Heart, Briefcase
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { CourseCardProps } from './CourseCard.types';

/**
 * Get department icon based on course code prefix (most accurate)
 */
const getDepartmentIcon = (department: string, courseCode: string) => {
  const codePrefix = courseCode.substring(0, 3).toLowerCase();

  switch (codePrefix) {
    // Psychology - Brain icon! 🧠
    case 'psy':
    case 'psc':
      return <Brain className="w-5 h-5" />;

    // Computer Science
    case 'csc':
    case 'cis':
    case 'com':
    case 'cs':
      return <Computer className="w-5 h-5" />;

    // Mathematics
    case 'mth':
    case 'mat':
    case 'cal':
    case 'sta': // Statistics
      return <Calculator className="w-5 h-5" />;

    // Physics
    case 'phy':
      return <Atom className="w-5 h-5" />;

    // Chemistry
    case 'che':
    case 'chm':
      return <Beaker className="w-5 h-5" />;

    // Biology
    case 'bio':
      return <Dna className="w-5 h-5" />;

    // History
    case 'his':
    case 'hst':
      return <ScrollText className="w-5 h-5" />;

    // Art
    case 'art':
      return <Palette className="w-5 h-5" />;

    // Business
    case 'bus':
    case 'mgt':
    case 'fin':
      return <Briefcase className="w-5 h-5" />;

    // Music
    case 'mus':
      return <Music className="w-5 h-5" />;

    // Languages/Literature
    case 'eng':
    case 'lit':
    case 'lan':
      return <Languages className="w-5 h-5" />;

    // Geography
    case 'geo':
      return <Globe className="w-5 h-5" />;

    // Health/Medicine
    case 'med':
    case 'nrs':
    case 'hlt':
      return <Heart className="w-5 h-5" />;

    default:
      // Fallback to department name matching
      return getDepartmentIconByName(department);
  }
};

/**
 * Fallback function to get icon by department name
 */
const getDepartmentIconByName = (department: string) => {
  const dept = department.toLowerCase();

  if (dept.includes('psychology')) {
    return <Brain className="w-5 h-5" />; // Brain icon! 🧠
  } else if (dept.includes('computer') || dept.includes('science')) {
    return <Computer className="w-5 h-5" />;
  } else if (dept.includes('math')) {
    return <Calculator className="w-5 h-5" />;
  } else if (dept.includes('physics')) {
    return <Atom className="w-5 h-5" />;
  } else if (dept.includes('chemistry')) {
    return <Beaker className="w-5 h-5" />;
  } else if (dept.includes('biology')) {
    return <Dna className="w-5 h-5" />;
  } else if (dept.includes('history')) {
    return <ScrollText className="w-5 h-5" />;
  } else if (dept.includes('art')) {
    return <Palette className="w-5 h-5" />;
  } else if (dept.includes('business')) {
    return <Briefcase className="w-5 h-5" />;
  } else if (dept.includes('music')) {
    return <Music className="w-5 h-5" />;
  } else if (dept.includes('english') || dept.includes('literature')) {
    return <Languages className="w-5 h-5" />;
  } else if (dept.includes('geography')) {
    return <Globe className="w-5 h-5" />;
  } else if (dept.includes('health') || dept.includes('medicine')) {
    return <Heart className="w-5 h-5" />;
  } else {
    return <BookOpen className="w-5 h-5" />; // Default fallback
  }
};

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewMap,
  onClick,
  className,
}) => {
  const handleViewMap = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    if (onViewMap) {
      onViewMap(course.id);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(course);
    }
  };

  const getGradientClass = (color: string) => {
    switch (color.toLowerCase()) {
      case 'purple':
        return 'gradient-purple';
      case 'blue':
        return 'gradient-blue';
      case 'indigo':
        return 'gradient-indigo';
      default:
        return 'gradient-blue';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={clsx(
        'group p-4 rounded-xl shadow-sm card-hover min-w-[240px] max-w-[280px] cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        getGradientClass(course.color),
        className
      )}
    >
      {/* Department Logo - Top Right Corner */}
      <div className="absolute top-3 right-3 p-2 bg-black/8 backdrop-blur-sm rounded-lg border border-black/15 shadow-sm transition-all duration-300 hover:bg-black/12 hover:shadow-md group-hover:scale-105">
        <div className="text-black/60 transition-colors duration-300 hover:text-black/80">
          {getDepartmentIcon(course.department, course.code)}
        </div>
      </div>

      <div className="space-y-3">
        {/* Course Code and Title - Add padding to avoid overlap with logo */}
        <div className="pr-12">
          <h3 className="text-base font-bold text-gray-900 mb-0.5">
            {course.code}
          </h3>
          <p className="text-xs text-gray-700 font-medium leading-tight">
            {course.title}
          </p>
        </div>

        {/* Schedule Info */}
        <div className="space-y-1.5">
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="w-3 h-3 mr-1.5 text-gray-500" />
            <span className="font-medium">
              {course.schedule.startTime} - {course.schedule.endTime}
            </span>
          </div>

          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="w-3 h-3 mr-1.5 text-gray-500" />
            <span className="font-medium">
              {course.schedule.venue}
            </span>
          </div>

          <div className="flex items-center text-xs text-gray-600">
            <User className="w-3 h-3 mr-1.5 text-gray-500" />
            <span className="font-medium">
              {course.lecturer.name}
            </span>
          </div>
        </div>

        {/* View on Map Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={handleViewMap}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-xs py-2"
        >
          View on Map
        </Button>
      </div>
    </div>
  );
};
