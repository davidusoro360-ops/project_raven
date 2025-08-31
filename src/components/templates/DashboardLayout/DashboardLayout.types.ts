import { ReactNode } from 'react';
import { NavigationItem } from '@/components/organisms/Sidebar';

export interface DashboardLayoutProps {
  children: ReactNode;
  navigationItems: NavigationItem[];
  rightSidebar?: ReactNode;
  className?: string;
}
