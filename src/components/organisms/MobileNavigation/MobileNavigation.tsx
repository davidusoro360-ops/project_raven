import React from 'react';
import { clsx } from 'clsx';
import { MobileNavigationProps } from './MobileNavigation.types';

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  navigationItems,
  className,
}) => {
  return (
    <nav className={clsx('lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2', className)}>
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={clsx(
              'flex flex-col items-center py-2 px-3 rounded-lg transition-colors',
              item.active
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <span className="mb-1">
              {item.icon}
            </span>
            <span className="text-xs font-medium">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
};
