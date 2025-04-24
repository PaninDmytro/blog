import React from 'react';
import classNames from 'classnames';

import { ButtonProps } from '../../../types/components/form.types';
import { BUTTON_VARIANTS } from '../../../constants/components/form.constants';

export const Button: React.FC<ButtonProps> = React.memo(({ 
  children, 
  variant = BUTTON_VARIANTS.PRIMARY, 
  className,
  ...props 
}) => {
  const buttonClasses = classNames(
    'px-4 py-2 rounded font-medium transition-colors duration-200',
    {
      'bg-blue-500 text-white hover:bg-blue-600': variant === BUTTON_VARIANTS.PRIMARY,
      'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === BUTTON_VARIANTS.SECONDARY,
      'bg-red-500 text-white hover:bg-red-600': variant === BUTTON_VARIANTS.DANGER,
    },
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
});
