import { ReactNode } from 'react';

export interface QuickLink {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface QuickLinksProps {
  links: QuickLink[];
  className?: string;
}
