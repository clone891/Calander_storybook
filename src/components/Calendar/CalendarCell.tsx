import React from 'react';
import type { CalendarCellProps } from './CalendarView.types';
import { isToday } from '@/utils/date.utils';
import clsx from 'clsx';

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  events,
  isToday: isTodayProp,
  isSelected,
  isCurrentMonth,
  onClick,
  onEventClick,
}) => {
  const handleClick = () => {
    onClick(date);
  };

  const handleEventClick = (event: React.MouseEvent, eventItem: any) => {
    event.stopPropagation();
    onEventClick(eventItem);
  };

  const dayNumber = date.getDate();
  const eventCount = events.length;
  const today = isTodayProp || isToday(date);

  return (
    <div
      className={clsx(
        'border border-neutral-200 h-32 p-2 cursor-pointer transition-colors',
        'hover:bg-neutral-50',
        !isCurrentMonth && 'bg-neutral-50 text-neutral-500',
        isSelected && 'bg-primary-50 border-primary-300',
        today && 'bg-primary-50'
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}. ${eventCount} events.`}
      aria-pressed={isSelected}
    >
      <div className="flex justify-between items-start mb-1">
        <span className={clsx(
          'text-sm font-medium',
          today && 'text-primary-600',
          !isCurrentMonth && 'text-neutral-400'
        )}>
          {dayNumber}
        </span>
        {today && (
          <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {dayNumber}
          </span>
        )}
      </div>

      <div className="space-y-1 overflow-hidden">
        {events.slice(0, 3).map(event => (
          <div
            key={event.id}
            className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80"
            style={{ backgroundColor: event.color || '#3b82f6', color: 'white' }}
            onClick={(e) => handleEventClick(e, event)}
          >
            {event.title}
          </div>
        ))}

        {eventCount > 3 && (
          <button className="text-xs text-primary-600 hover:underline">
            +{eventCount - 3} more
          </button>
        )}
      </div>
    </div>
  );
};
