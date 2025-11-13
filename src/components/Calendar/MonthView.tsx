import React from 'react';
import type { MonthViewProps } from './CalendarView.types';
import { CalendarCell } from './CalendarCell';
import { getCalendarGrid, getShortDayName, isSameMonth } from '@/utils/date.utils';
import { getEventsForDate } from '@/utils/event.utils';

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const grid = getCalendarGrid(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    return getShortDayName(date);
  });

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="grid grid-cols-7 bg-neutral-50 border-b border-neutral-200">
        {weekDays.map(day => (
          <div
            key={day}
            className="py-3 text-center text-sm font-semibold text-neutral-700"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {grid.map((date, index) => {
          const dayEvents = getEventsForDate(events, date);
          const isToday = new Date().toDateString() === date.toDateString();
          const isCurrentMonth = isSameMonth(date, currentDate);
          
          return (
            <CalendarCell
              key={index}
              date={date}
              events={dayEvents}
              isToday={isToday}
              isSelected={false}
              isCurrentMonth={isCurrentMonth}
              onClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
};
