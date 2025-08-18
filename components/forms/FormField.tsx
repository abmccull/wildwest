import React, { ReactNode } from 'react';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  helpText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  required = false,
  children,
  className = '',
  helpText,
}) => {
  const fieldId = htmlFor || `field_${Date.now()}_${Math.random()}`;
  const errorId = `${fieldId}_error`;
  const helpId = `${fieldId}_help`;

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={fieldId} className="block text-sm font-medium text-text-dark mb-2">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {React.cloneElement(children as React.ReactElement<any>, {
          id: fieldId,
          'aria-invalid': error ? 'true' : 'false',
          'aria-describedby':
            [error ? errorId : null, helpText ? helpId : null].filter(Boolean).join(' ') ||
            undefined,
          className: `w-full px-4 py-3 border rounded-lg text-text-dark placeholder-gray-400 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-primary'
          } ${((children as React.ReactElement).props as any)?.className || ''}`,
        })}
      </div>

      {helpText && (
        <p id={helpId} className="mt-1 text-sm text-gray-600">
          {helpText}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};
