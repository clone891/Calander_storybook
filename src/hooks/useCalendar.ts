import { useState, useCallback } from 'react';

interface CalendarState {
  currentDate: Date;
  view: 'month' | 'week';
  selectedDate: Date | null;
}

export const useCalendar = (initialDate: Date = new Date()) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: 'month',
    selectedDate: null,
  });

  const goToNextMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() + 1, 1),
    }));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() - 1, 1),
    }));
  }, []);

  const goToNextWeek = useCallback(() => {
    setState(prev => {
      const newDate = new Date(prev.currentDate);
      newDate.setDate(newDate.getDate() + 7);
      return {
        ...prev,
        currentDate: newDate,
      };
    });
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setState(prev => {
      const newDate = new Date(prev.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      return {
        ...prev,
        currentDate: newDate,
      };
    });
  }, []);

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(),
    }));
  }, []);

  const goToView = useCallback((view: 'month' | 'week') => {
    setState(prev => ({
      ...prev,
      view,
    }));
  }, []);

  const goToDate = useCallback((date: Date) => {
    setState(prev => ({
      ...prev,
      currentDate: date,
    }));
  }, []);

  const selectDate = useCallback((date: Date) => {
    setState(prev => ({
      ...prev,
      selectedDate: date,
    }));
  }, []);

  return {
    ...state,
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    goToView,
    goToDate,
    selectDate,
  };
};
