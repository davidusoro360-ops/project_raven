import { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
  active?: boolean;
}

export interface SidebarProps {
  navigationItems: NavigationItem[];
  className?: string;
}
