import React, { useState } from 'react';
import { clsx } from 'clsx';
import { User } from 'lucide-react';
import { AvatarProps } from './Avatar.types';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className,
  style,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const shouldShowImage = src && !imageError;
  const shouldShowFallback = fallback && !shouldShowImage;

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 overflow-hidden',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      style={style}
      onClick={onClick}
    >
      {shouldShowImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : shouldShowFallback ? (
        <span className="font-semibold uppercase">
          {fallback.slice(0, 2)}
        </span>
      ) : (
        <User className={iconSizes[size]} />
      )}
    </div>
  );
};
