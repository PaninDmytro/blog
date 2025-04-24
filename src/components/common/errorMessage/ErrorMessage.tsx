import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = React.memo(({ message }) => (
  <div className="p-4 bg-red-100 text-red-700 rounded">{message}</div>
));
