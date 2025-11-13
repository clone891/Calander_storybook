import React, { useState } from 'react';
import type { CalendarViewProps } from './CalendarView.types';
import { useCalendar } from '@/hooks/useCalendar';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { Button } from '@/components/primitives/Button';
import { getMonthName } from '@/utils/date.utils';
import clsx from 'clsx';

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}) => {
  const {
    currentDate,
    view,
    selectedDate,
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    goToView,
    selectDate,
  } = useCalendar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleDateClick = (date: Date) => {
    selectDate(date);
    setSelectedEvent(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date) => {
    selectDate(date);
    setSelectedEvent(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventSave = (eventData: any) => {
    if (modalMode === 'create') {
      onEventAdd(eventData);
    } else {
      onEventUpdate(eventData.id, eventData);
    }
  };

  const handleEventDelete = (id: string) => {
    onEventDelete(id);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-card mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-neutral-900">
              {view === 'month' ? getMonthName(currentDate) : 'Week'} {currentDate.getFullYear()}
            </h1>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={view === 'month' ? goToPreviousMonth : goToPreviousWeek}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              <Button variant="ghost" onClick={goToToday}>
                Today
              </Button>
              
              <Button variant="ghost" onClick={view === 'month' ? goToNextMonth : goToNextWeek}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-neutral-100 rounded-lg p-1 flex">
              <button
                className={clsx(
                  'px-3 py-1 rounded-md text-sm font-medium',
                  view === 'month' ? 'bg-white shadow-sm' : 'text-neutral-600'
                )}
                onClick={() => goToView('month')}
              >
                Month
              </button>
              <button
                className={clsx(
                  'px-3 py-1 rounded-md text-sm font-medium',
                  view === 'week' ? 'bg-white shadow-sm' : 'text-neutral-600'
                )}
                onClick={() => goToView('week')}
              >
                Week
              </button>
            </div>
            
            <Button onClick={() => {
              setSelectedEvent(null);
              setModalMode('create');
              setIsModalOpen(true);
            }}>
              Add Event
            </Button>
          </div>
        </div>
      </div>

      {view === 'month' ? (
        <MonthView
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      ) : (
        <WeekView
          currentDate={currentDate}
          events={events}
          onEventClick={handleEventClick}
          onTimeSlotClick={handleTimeSlotClick}
        />
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleEventSave}
        onDelete={modalMode === 'edit' ? handleEventDelete : undefined}
        event={selectedEvent}
        selectedDate={selectedDate || undefined}
      />
    </div>
  );
};
