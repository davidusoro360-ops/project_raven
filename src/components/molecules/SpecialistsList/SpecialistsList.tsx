import React from 'react';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { SpecialistsListProps } from './SpecialistsList.types';

export const SpecialistsList: React.FC<SpecialistsListProps> = ({
  categories,
  className,
}) => {
  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Specialists</h3>
        <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center">
          See all
          <ChevronRight className="w-3 h-3 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {category.count} specialists
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {category.title}
              </h4>

              <div className="flex items-center -space-x-1">
                {/* Show first few avatars with overlap */}
                {category.specialists.slice(0, 4).map((specialist, index) => {
                  const zIndexClass = index === 0 ? 'z-40' : index === 1 ? 'z-30' : index === 2 ? 'z-20' : 'z-10';
                  return (
                    <Avatar
                      key={specialist.id}
                      src={specialist.avatar}
                      alt={specialist.name}
                      size="sm"
                      fallback={specialist.name}
                      className={`border-2 border-white relative ${zIndexClass}`}
                    />
                  );
                })}

                {/* Show count if more specialists */}
                {category.specialists.length > 4 && (
                  <div className="w-8 h-8 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center relative z-0">
                    <span className="text-xs font-semibold text-gray-700">
                      +{category.specialists.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
