import React from 'react';
import classNames from 'classnames';

import { ModalProps } from '../../../types/components/modal.types';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={classNames(
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    )}>
      <div className={classNames(
        "bg-white rounded-lg p-6 max-w-md w-full"
      )}>
        <div className={classNames(
          "flex justify-between items-center mb-4"
        )}>
          <h2 className={classNames(
            "text-xl font-semibold"
          )}>{title}</h2>
          <button
            onClick={onClose}
            className={classNames(
              "text-gray-500 hover:text-gray-700"
            )}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}; 