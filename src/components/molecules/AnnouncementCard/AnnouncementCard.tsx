import React from 'react';
import { clsx } from 'clsx';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { AnnouncementCardProps } from './AnnouncementCard.types';

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  subtitle,
  badge,
  countdown,
  className,
  onClick,
  variant = 'homepage', // Default to homepage style
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Determine styling based on variant with enhanced professional design
  const getCardStyles = () => {
    if (variant === 'page') {
      // Announcements page: White background with black border
      return {
        container: 'bg-white border-2 border-black rounded-xl p-5 text-gray-900 relative overflow-hidden transition-all duration-300 ease-out shadow-sm hover:shadow-lg hover:border-gray-800 backdrop-blur-sm',
        title: 'text-lg font-bold text-gray-900 leading-tight',
        subtitle: 'text-gray-600 text-sm leading-relaxed',
        countdown: 'text-gray-700',
        clockIcon: 'text-gray-500',
        decoration: 'bg-gray-50',
        badge: 'absolute top-4 right-4 z-20'
      };
    } else {
      // Homepage: Enhanced black gradient background with professional touches
      return {
        container: 'gradient-dark rounded-xl p-5 text-white relative overflow-hidden transition-all duration-300 ease-out shadow-lg hover:shadow-2xl backdrop-blur-sm border border-gray-800/50',
        title: 'text-lg font-bold leading-tight',
        subtitle: 'text-gray-200 text-sm leading-relaxed',
        countdown: 'text-white',
        clockIcon: 'text-gray-300',
        decoration: 'bg-white/10',
        badge: 'absolute top-4 right-4 z-20'
      };
    }
  };

  const styles = getCardStyles();

  return (
    <div
      onClick={handleClick}
      className={clsx(
        styles.container,
        onClick && 'cursor-pointer hover:scale-[1.01] active:scale-[0.99] group',
        className
      )}
    >
      {/* Enhanced Badge with better positioning */}
      {badge && (
        <div className={styles.badge}>
          <Badge
            variant="danger"
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 shadow-lg transition-all duration-200 hover:scale-105"
          >
            {badge}
          </Badge>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Enhanced Content Layout */}
        <div className="space-y-2 pr-20">
          <h3 className={clsx(styles.title, 'group-hover:text-opacity-90 transition-all duration-200')}>
            {title}
          </h3>
          <p className={clsx(styles.subtitle, 'group-hover:text-opacity-80 transition-all duration-200')}>
            {subtitle}
          </p>
        </div>

        {/* Enhanced Countdown with better styling */}
        {countdown && (
          <div className={clsx(
            'mt-4 flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
            variant === 'page'
              ? 'bg-gray-50 group-hover:bg-gray-100'
              : 'bg-white/10 group-hover:bg-white/20 backdrop-blur-sm'
          )}>
            <div className={clsx(
              'p-1.5 rounded-full transition-all duration-200',
              variant === 'page'
                ? 'bg-blue-100 group-hover:bg-blue-200'
                : 'bg-white/20 group-hover:bg-white/30'
            )}>
              <Clock className={clsx(
                'w-3.5 h-3.5 transition-all duration-200',
                styles.clockIcon,
                'group-hover:scale-110'
              )} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium opacity-70">
                Time remaining
              </span>
              <span className={clsx('text-sm font-bold', styles.countdown)}>
                {countdown}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Background Decorations with Animation */}
      <div className={clsx(
        'absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12',
        styles.decoration
      )} />
      <div className={clsx(
        'absolute bottom-0 left-0 w-20 h-20 rounded-full translate-y-10 -translate-x-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12',
        styles.decoration
      )} />

      {/* Subtle Gradient Overlay for Depth */}
      <div className={clsx(
        'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
        variant === 'page'
          ? 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50'
          : 'bg-gradient-to-br from-white/5 to-transparent'
      )} />
    </div>
  );
};
