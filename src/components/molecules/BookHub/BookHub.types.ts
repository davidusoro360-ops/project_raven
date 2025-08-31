export interface Book {
  id: string;
  title: string;
  author?: string;
  cover?: string;
  price?: number;
  condition?: 'new' | 'like-new' | 'good' | 'fair';
}

export interface BookHubProps {
  books: Book[];
  className?: string;
}
