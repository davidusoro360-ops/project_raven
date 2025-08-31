import React from 'react';
import { clsx } from 'clsx';
import { Moon, Heart, Award } from 'lucide-react';
import { WellnessStatsProps } from './WellnessStats.types';

export const WellnessStats: React.FC<WellnessStatsProps> = ({
  stats,
  className,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'moon':
        return <Moon className="w-4 h-4" />;
      case 'heart':
        return <Heart className="w-4 h-4" />;
      case 'award':
        return <Award className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'teal':
        return 'bg-teal-50 text-teal-600';
      case 'red':
        return 'bg-rose-50 text-rose-600';
      case 'yellow':
        return 'bg-amber-50 text-amber-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className={clsx('grid grid-cols-2 lg:grid-cols-3 gap-3', className)}>
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-lg p-3 border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className={clsx('p-1.5 rounded-full', getColorClasses(stat.color))}>
              {getIcon(stat.icon)}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {stat.label}
            </span>
          </div>
          <div className="text-sm font-bold text-gray-900">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};
