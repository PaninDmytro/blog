import React from 'react';
import classNames from 'classnames';

import { InputProps } from '../../../types/components/form.types';
import { DEFAULT_TEXTAREA_ROWS } from '../../../constants/components/form.constants';

export const Input: React.FC<InputProps> = React.memo(({ 
  name, 
  type = 'text', 
  placeholder, 
  register, 
  error,
  value,
  onChange,
  className = '',
  multiline = false,
  rows = DEFAULT_TEXTAREA_ROWS
}) => {
  const inputClasses = classNames(
    'w-full px-4 py-3 rounded-lg border',
    'focus:outline-none focus:ring-2 focus:ring-blue-500',
    'transition-colors duration-200',
    {
      'border-red-500 bg-red-50': error,
      'border-gray-300 hover:border-gray-400': !error
    },
    'resize-none',
    className
  );

  return (
    <div className="mb-4">
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          {...(register ? register(name) : {})}
          className={inputClasses}
          style={{ resize: 'none' }}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...(register ? register(name) : {})}
          className={inputClasses}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});
