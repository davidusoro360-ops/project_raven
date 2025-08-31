import React from 'react';
import { clsx } from 'clsx';
import { CalendarProps } from './Calendar.types';

export const Calendar: React.FC<CalendarProps> = ({
  className,
  selectedDate = new Date(),
  onDateSelect,
}) => {
  const today = new Date();

  // Get month name
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Get day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate current week days (simplified)
  const weekDays = [];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDays.push(date);
  }
  
  const handleDateClick = (date: Date) => {
    onDateSelect?.(date);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  
  return (
    <div className={clsx('bg-white rounded-xl p-4 shadow-sm border border-gray-100', className)}>
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Today Oct'14
        </h3>
        <p className="text-sm text-gray-500">{monthNames[today.getMonth()]} {today.getFullYear()}</p>
      </div>
      
      {/* Week view */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => {
          const dayName = dayNames[date.getDay()];
          const dayNumber = date.getDate();
          const isCurrentDay = isSameDay(date, today);
          const isSelectedDay = isSameDay(date, selectedDate);

          return (
            <div key={index} className="text-center">
              <div className="text-xs font-medium text-gray-500 mb-2">
                {dayName}
              </div>
              <button
                onClick={() => handleDateClick(date)}
                className={clsx(
                  'w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-lg transition-colors',
                  {
                    'bg-gray-900 text-white': isCurrentDay,
                    'bg-gray-100 text-gray-700': !isCurrentDay && !isSelectedDay,
                    'bg-blue-100 text-blue-600': isSelectedDay && !isCurrentDay,
                    'hover:bg-gray-200': !isCurrentDay && !isSelectedDay,
                  }
                )}
              >
                {dayNumber}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
