import type { CalendarEvent } from '@/components/Calendar/CalendarView.types';

/**
 * Filters events by date
 */
export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    
    // Check if event starts on this date
    if (eventStart.toDateString() === date.toDateString()) {
      return true;
    }
    
    // Check if event spans multiple days and includes this date
    if (eventStart < date && eventEnd > date) {
      return true;
    }
    
    return false;
  });
};

/**
 * Filters events for a week
 */
export const getEventsForWeek = (events: CalendarEvent[], weekStart: Date): CalendarEvent[] => {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  
  return events.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    
    // Event starts before or during the week and ends after or during the week
    return (eventStart <= weekEnd && eventEnd >= weekStart);
  });
};

/**
 * Sorts events by start time
 */
export const sortEventsByStartTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });
};

/**
 * Generates a unique ID for events
 */
export const generateEventId = (): string => {
  return `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Default colors for events
 */
export const EVENT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // yellow
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
];

/**
 * Default categories for events
 */
export const EVENT_CATEGORIES = [
  'Meeting',
  'Work',
  'Personal',
  'Holiday',
  'Birthday',
  'Appointment',
  'Reminder',
  'Other',
];
