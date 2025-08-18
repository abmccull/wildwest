import React from 'react';
import { generateTimeSlots, formatTimeDisplay, getTomorrowDate } from '@/lib/form-utils';

export interface DateTimePickerProps {
  dateValue: string;
  timeValue: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  dateError?: string;
  timeError?: string;
  dateId?: string;
  timeId?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  dateError,
  timeError,
  dateId = 'preferred-date',
  timeId = 'preferred-time',
}) => {
  const timeSlots = generateTimeSlots();
  const minDate = getTomorrowDate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Date Picker */}
      <div>
        <label htmlFor={dateId} className="block text-sm font-medium text-text-dark mb-2">
          Preferred Date
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        </label>

        <input
          type="date"
          id={dateId}
          value={dateValue}
          onChange={(e) => onDateChange(e.target.value)}
          min={minDate}
          className={`w-full px-4 py-3 border rounded-lg text-text-dark min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
            dateError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-primary'
          }`}
          aria-invalid={dateError ? 'true' : 'false'}
          aria-describedby={dateError ? `${dateId}-error` : undefined}
        />

        {dateError && (
          <p
            id={`${dateId}-error`}
            className="mt-2 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {dateError}
          </p>
        )}
      </div>

      {/* Time Picker */}
      <div>
        <label htmlFor={timeId} className="block text-sm font-medium text-text-dark mb-2">
          Preferred Time
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        </label>

        <select
          id={timeId}
          value={timeValue}
          onChange={(e) => onTimeChange(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg text-text-dark min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white ${
            timeError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary'
          }`}
          aria-invalid={timeError ? 'true' : 'false'}
          aria-describedby={timeError ? `${timeId}-error` : undefined}
        >
          <option value="">Select a time</option>
          {timeSlots.map((time) => (
            <option key={time} value={time}>
              {formatTimeDisplay(time)}
            </option>
          ))}
        </select>

        {timeError && (
          <p
            id={`${timeId}-error`}
            className="mt-2 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {timeError}
          </p>
        )}
      </div>
    </div>
  );
};
