import React from 'react';
import type { WeekViewProps } from './CalendarView.types';
import { getDaysInWeek, getShortDayName, getTimeSlots, formatTime } from '@/utils/date.utils';
import { getEventsForDate, sortEventsByStartTime } from '@/utils/event.utils';
import clsx from 'clsx';

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
}) => {
  const daysInWeek = getDaysInWeek(currentDate);
  const timeSlots = getTimeSlots(30); // 30-minute intervals
  
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="grid grid-cols-8 bg-neutral-50 border-b border-neutral-200">
        <div className="py-3 px-2 text-sm font-semibold text-neutral-700">
          Time
        </div>
        {daysInWeek.map(day => (
          <div
            key={day.toISOString()}
            className="py-3 px-2 text-center text-sm font-semibold text-neutral-700"
          >
            <div>{getShortDayName(day)}</div>
            <div>{day.getDate()}</div>
          </div>
        ))}
      </div>
      
      <div className="h-96 overflow-y-auto">
        {timeSlots.map((timeSlot, index) => (
          <div key={timeSlot.toISOString()} className="grid grid-cols-8 border-b border-neutral-100">
            <div className="py-2 px-2 text-xs text-neutral-500 text-right">
              {formatTime(timeSlot, { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
            
            {daysInWeek.map(day => {
              const dayEvents = getEventsForDate(events, day);
              const sortedEvents = sortEventsByStartTime(dayEvents);
              
              // Find events that overlap with this time slot
              const slotEvents = sortedEvents.filter(event => {
                const eventStart = new Date(event.startDate);
                const eventEnd = new Date(event.endDate);
                const slotStart = new Date(day);
                slotStart.setHours(timeSlot.getHours(), timeSlot.getMinutes(), 0, 0);
                
                const slotEnd = new Date(slotStart);
                slotEnd.setMinutes(slotEnd.getMinutes() + 30);
                
                return (
                  (eventStart < slotEnd && eventEnd > slotStart)
                );
              });
              
              return (
                <div
                  key={`${day.toISOString()}-${index}`}
                  className="border-l border-neutral-100 p-1 min-h-[60px] cursor-pointer hover:bg-neutral-50"
                  onClick={() => {
                    const slotDate = new Date(day);
                    slotDate.setHours(timeSlot.getHours(), timeSlot.getMinutes(), 0, 0);
                    onTimeSlotClick(slotDate);
                  }}
                >
                  {slotEvents.map(event => (
                    <div
                      key={event.id}
                      className={clsx(
                        'text-xs p-1 mb-1 rounded truncate cursor-pointer',
                        'hover:opacity-80'
                      )}
                      style={{ 
                        backgroundColor: event.color || '#3b82f6', 
                        color: 'white' 
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
