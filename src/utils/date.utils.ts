/**
 * Calculates the number of days between two dates
 * @param start - Start date
 * @param end - End date
 * @returns Number of days (can be negative if end is before start)
 */
export const daysBetween = (start: Date, end: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startMs = start.getTime();
  const endMs = end.getTime();
  return Math.floor((endMs - startMs) / msPerDay);
};

/**
 * Checks if two dates fall on the same day (ignores time)
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Checks if two dates fall in the same month
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

/**
 * Gets all days in a month
 */
export const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysCount }, (_, i) => new Date(year, month, i + 1));
};

/**
 * Gets the calendar grid (42 cells for month view)
 */
export const getCalendarGrid = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();

  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDay);

  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return grid;
};

/**
 * Gets the start of the week for a given date
 */
export const getStartOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

/**
 * Gets the end of the week for a given date
 */
export const getEndOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff));
};

/**
 * Gets the days in a week for a given date
 */
export const getDaysInWeek = (date: Date): Date[] => {
  const startOfWeek = getStartOfWeek(date);
  const days: Date[] = [];
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  
  return days;
};

/**
 * Formats a date for display
 */
export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  }).format(date);
};

/**
 * Formats a time for display
 */
export const formatTime = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    ...options
  }).format(date);
};

/**
 * Gets the month name
 */
export const getMonthName = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
};

/**
 * Gets the day of the week name
 */
export const getDayName = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
};

/**
 * Gets the short day of the week name
 */
export const getShortDayName = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
};

/**
 * Checks if a date is today
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Adds days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Adds months to a date
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Gets the time slots for a day
 */
export const getTimeSlots = (intervalMinutes: number = 30): Date[] => {
  const slots: Date[] = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  while (date <= endOfDay) {
    slots.push(new Date(date));
    date.setMinutes(date.getMinutes() + intervalMinutes);
  }
  
  return slots;
};
