export interface Specialist {
  id: string;
  name: string;
  avatar?: string;
}

export interface SpecialistCategory {
  id: string;
  title: string;
  count: number;
  specialists: Specialist[];
}

export interface SpecialistsListProps {
  categories: SpecialistCategory[];
  className?: string;
}
