import React from 'react';
import { clsx } from 'clsx';
import { ChevronRight, BookOpen } from 'lucide-react';
import { BookHubProps } from './BookHub.types';

export const BookHub: React.FC<BookHubProps> = ({
  books,
  className,
}) => {
  return (
    <div className={clsx('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 flex items-center">
          <BookOpen className="w-4 h-4 mr-2 text-green-600" />
          Book Hub
        </h3>
        <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center">
          See all
          <ChevronRight className="w-3 h-3 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {books.slice(0, 4).map((book) => (
          <div
            key={book.id}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-gray-100 rounded-md overflow-hidden mb-1.5 group-hover:shadow-sm transition-shadow">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200">
                  <BookOpen className="w-6 h-6 text-slate-500" />
                </div>
              )}
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                {book.title}
              </h4>
              {book.author && (
                <p className="text-xs text-gray-500 truncate">
                  {book.author}
                </p>
              )}
              {book.price && (
                <p className="text-xs font-semibold text-green-600">
                  ${book.price}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
