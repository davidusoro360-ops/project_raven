import React from 'react';
import { clsx } from 'clsx';
import { Sidebar } from '@/components/organisms/Sidebar';
import { MobileNavigation } from '@/components/organisms/MobileNavigation';
import { DashboardLayoutProps } from './DashboardLayout.types';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  navigationItems,
  rightSidebar,
  className,
}) => {
  return (
    <div className={clsx('flex h-screen bg-gray-50 overflow-hidden', className)}>
      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar navigationItems={navigationItems} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="p-3 sm:p-4 lg:p-6 max-w-full pb-20 lg:pb-6">
          {children}
        </div>
      </main>

      {/* Right Sidebar - Hidden on mobile and tablet */}
      {rightSidebar && (
        <aside className="hidden xl:block w-72 bg-white border-l border-gray-100 overflow-y-auto">
          <div className="p-4">
            {rightSidebar}
          </div>
        </aside>
      )}

      {/* Mobile Navigation */}
      <MobileNavigation navigationItems={navigationItems} />
    </div>
  );
};
