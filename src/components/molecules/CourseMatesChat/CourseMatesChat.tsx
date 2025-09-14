// CourseMatesChat.tsx - Scalable component for displaying course mates and chat options with mock data
import React from 'react';
import { clsx } from 'clsx';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';

interface CourseMate {
  id: string;
  name: string;
  avatar: string;
}

interface ChatCategory {
  id: string;
  title: string;
  count: number;
  mates: CourseMate[];
}

interface CourseMatesChatProps {
  categories: ChatCategory[];
  className?: string;
}

export const CourseMatesChat: React.FC<CourseMatesChatProps> = ({
  categories,
  className,
}) => {
  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">
          Chat with Course Mates
        </h3>
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
                  {category.count} course mates
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {category.title}
              </h4>

              <div className="flex items-center justify-end -space-x-3">
                {/* Show first few avatars with Instagram-like bubble overlap - clean, no border, tighter overlap */}
                {category.mates.slice(0, 5).map((mate, index) => {
                  const zIndexClass = index === 0 ? 'z-50' : index === 1 ? 'z-40' : index === 2 ? 'z-30' : index === 3 ? 'z-20' : 'z-10';
                  return (
                    <Avatar
                      key={mate.id}
                      src={mate.avatar}
                      alt={mate.name}
                      size="md"
                      fallback={mate.name.split(' ').map(n => n[0]).join('')}
                      className={`relative ${zIndexClass} shadow-md ring-1 ring-white/50`}
                    />
                  );
                })}

                {/* Show count if more mates - Instagram-style */}
                {category.mates.length > 5 && (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center relative z-0 shadow-md ring-1 ring-white/50">
                    <span className="text-sm font-bold text-gray-800">
                      +{category.mates.length - 5}
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