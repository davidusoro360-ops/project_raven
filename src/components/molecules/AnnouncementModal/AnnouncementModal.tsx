import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { X, Clock, MapPin, User, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { AnnouncementModalProps } from './AnnouncementModal.types';

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  countdown,
  description,
  location,
  instructor,
  priority = 'medium',
}) => {
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

  if (!isOpen) return null;

  const getPriorityIcon = () => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="w-5 h-5 text-white" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-white" />;
      case 'medium':
        return <Info className="w-5 h-5 text-white" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-white" />;
      default:
        return <Info className="w-5 h-5 text-white" />;
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'urgent':
        return 'from-gray-800 to-gray-900';
      case 'high':
        return 'from-gray-700 to-gray-800';
      case 'medium':
        return 'from-gray-600 to-gray-700';
      case 'low':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out scale-100 animate-slide-up">
        {/* Header with elegant gradient */}
        <div className={clsx('bg-gradient-to-br p-6 text-white relative overflow-hidden', getPriorityColor())}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Priority icon and badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                {getPriorityIcon()}
                {priority === 'urgent' && (
                  <div className="absolute inset-0 bg-white/5 rounded-xl animate-pulse"></div>
                )}
              </div>
            </div>
            {badge && (
              <div className={clsx(
                "px-3 py-1 backdrop-blur-sm rounded-full border",
                badge === 'URGENT'
                  ? "bg-red-500/90 border-red-400/50 text-white"
                  : "bg-white/15 border-white/20 text-white"
              )}>
                <span className="text-xs font-semibold">{badge}</span>
              </div>
            )}
          </div>

          {/* Title and subtitle */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold leading-tight">
              {title}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Countdown */}
          {countdown && (
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="p-3 bg-gray-800 rounded-xl">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Time Remaining</p>
                <p className="text-xl font-bold text-gray-900">{countdown}</p>
              </div>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Details</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          )}

          {/* Location and Instructor */}
          <div className="space-y-4">
            {location && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
                  <p className="text-sm font-semibold text-gray-900">{location}</p>
                </div>
              </div>
            )}
            {instructor && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Instructor</p>
                  <p className="text-sm font-semibold text-gray-900">{instructor}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Dismiss
            </button>
            <button
              className="flex-1 py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
            >
              Mark as Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
