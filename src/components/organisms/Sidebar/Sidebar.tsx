import React from 'react';
import { clsx } from 'clsx';
import { SidebarProps } from './Sidebar.types';

export const Sidebar: React.FC<SidebarProps> = ({
  navigationItems,
  className,
}) => {
  return (
    <div className={clsx('w-52 bg-white h-full flex flex-col border-r border-gray-100', className)}>
      {/* Brand Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="text-center">
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            RAYVEN
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            THE FUTURE IS NOW
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={clsx(
                  'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  item.active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <span className="mr-2.5 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
