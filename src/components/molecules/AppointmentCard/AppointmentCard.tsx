import React from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { AppointmentCardProps } from './AppointmentCard.types';

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  title,
  doctorName,
  doctorTitle,
  doctorAvatar,
  time,
  date,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`bg-white text-gray-900 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
      onClick={onClick}
    >
      <div className="text-xs text-gray-500 mb-2">
        {date} • {time}
      </div>

      <h3 className="text-lg font-semibold mb-3 text-gray-900">
        {title}
      </h3>

      <div className="flex items-center gap-3">
        <Avatar
          src={doctorAvatar}
          alt={doctorName}
          size="sm"
          fallback={doctorName.split(' ').map(n => n[0]).join('')}
        />
        <div>
          <div className="font-medium text-sm text-gray-900">
            {doctorName}
          </div>
          <div className="text-xs text-gray-500">
            {doctorTitle}
          </div>
        </div>
      </div>
    </div>
  );
};
