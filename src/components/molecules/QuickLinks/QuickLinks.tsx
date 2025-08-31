import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { QuickLinksProps } from './QuickLinks.types';

export const QuickLinks: React.FC<QuickLinksProps> = ({ links, className = '' }) => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const toggleDropdown = (linkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdowns(prev => ({
      ...prev,
      [linkId]: !prev[linkId]
    }));
  };

  return (
    <div className={`bg-white rounded-xl p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h2>

      <div className="flex gap-8 overflow-x-auto pb-2">
        {links.map((link) => (
          <div key={link.id} className="relative flex-shrink-0 min-w-[100px]">
            {/* Main Button - Back to Original Round Style */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={link.onClick}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 border-4 border-black hover:border-gray-800 transition-all duration-300 ease-out hover:shadow-md group hover:scale-[1.05] active:scale-[0.95]"
              >
                <div className="text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {link.icon}
                </div>
              </button>

              <div className="flex items-center gap-1 mb-1">
                <h3 className="font-medium text-gray-900 text-sm">
                  {link.title}
                </h3>
                <button
                  onClick={(e) => toggleDropdown(link.id, e)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  {openDropdowns[link.id] ? (
                    <ChevronUp className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500">
                {link.description}
              </p>
            </div>

            {/* Simple Dropdown Menu */}
            {openDropdowns[link.id] && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                <button
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    setOpenDropdowns(prev => ({ ...prev, [link.id]: false }));
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Open {link.title}
                </button>

                <button
                  onClick={() => {
                    console.log(`View details for ${link.title}`);
                    setOpenDropdowns(prev => ({ ...prev, [link.id]: false }));
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  View Details
                </button>

                <button
                  onClick={() => {
                    console.log(`Settings for ${link.title}`);
                    setOpenDropdowns(prev => ({ ...prev, [link.id]: false }));
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50 transition-colors duration-200"
                >
                  Settings
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
