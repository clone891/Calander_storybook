import React, { useState, useEffect } from 'react';
import type { EventModalProps } from './CalendarView.types';
import { Button } from '@/components/primitives/Button';
import { Select } from '@/components/primitives/Select';
import { EVENT_COLORS, EVENT_CATEGORIES } from '@/utils/event.utils';
import { formatTime, formatDate } from '@/utils/date.utils';
import clsx from 'clsx';

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  selectedDate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState(EVENT_COLORS[0]);
  const [category, setCategory] = useState(EVENT_CATEGORIES[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!event;

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      
      setStartDate(formatDate(start, { year: 'numeric', month: '2-digit', day: '2-digit' }));
      setStartTime(formatTime(start, { hour: '2-digit', minute: '2-digit', hour12: false }));
      setEndDate(formatDate(end, { year: 'numeric', month: '2-digit', day: '2-digit' }));
      setEndTime(formatTime(end, { hour: '2-digit', minute: '2-digit', hour12: false }));
      
      setColor(event.color || EVENT_COLORS[0]);
      setCategory(event.category || EVENT_CATEGORIES[0]);
    } else if (selectedDate) {
      const date = new Date(selectedDate);
      
      setStartDate(formatDate(date, { year: 'numeric', month: '2-digit', day: '2-digit' }));
      setStartTime('09:00');
      setEndDate(formatDate(date, { year: 'numeric', month: '2-digit', day: '2-digit' }));
      setEndTime('10:00');
      
      setColor(EVENT_COLORS[0]);
      setCategory(EVENT_CATEGORIES[0]);
    } else {
      // Reset form for new event
      setTitle('');
      setDescription('');
      
      const today = new Date();
      setStartDate(formatDate(today, { year: 'numeric', month: '2-digit', day: '2-digit' }));
      setStartTime('09:00');
      setEndDate(formatDate(today, { year: 'numeric', month: '2-digit', day: '2-digit' }));
      setEndTime('10:00');
      
      setColor(EVENT_COLORS[0]);
      setCategory(EVENT_CATEGORIES[0]);
    }
    
    setErrors({});
  }, [event, selectedDate, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!startTime) {
      newErrors.startTime = 'Start time is required';
    }
    
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (!endTime) {
      newErrors.endTime = 'End time is required';
    }
    
    if (startDate && startTime && endDate && endTime) {
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);
      
      if (endDateTime <= startDateTime) {
        newErrors.endTime = 'End time must be after start time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    const eventData = {
      id: event?.id || '',
      title,
      description,
      startDate: startDateTime,
      endDate: endDateTime,
      color,
      category,
    };
    
    onSave(eventData);
    onClose();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  const categoryOptions = EVENT_CATEGORIES.map(cat => ({
    value: cat,
    label: cat,
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">
            {isEditing ? 'Edit Event' : 'New Event'}
          </h2>
        </div>
        
        <div className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={clsx(
                'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                errors.title && 'border-red-500'
              )}
              placeholder="Event title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={clsx(
                'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                errors.description && 'border-red-500'
              )}
              rows={3}
              placeholder="Event description (optional)"
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={clsx(
                  'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.startDate && 'border-red-500'
                )}
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-neutral-700 mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={clsx(
                  'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.startTime && 'border-red-500'
                )}
              />
              {errors.startTime && <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={clsx(
                  'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.endDate && 'border-red-500'
                )}
              />
              {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-neutral-700 mb-1">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={clsx(
                  'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.endTime && 'border-red-500'
                )}
              />
              {errors.endTime && <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {EVENT_COLORS.map(colorValue => (
                <button
                  key={colorValue}
                  type="button"
                  className={clsx(
                    'w-8 h-8 rounded-md border-2',
                    color === colorValue ? 'border-neutral-900' : 'border-transparent'
                  )}
                  style={{ backgroundColor: colorValue }}
                  onClick={() => setColor(colorValue)}
                  aria-label={`Select ${colorValue} color`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Category
            </label>
            <Select
              options={categoryOptions}
              value={category}
              onChange={(value) => setCategory(value)}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-neutral-200 flex justify-between">
          <div>
            {isEditing && onDelete && (
              <Button
                onClick={handleDelete}
                className="text-red-600"
              >
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
