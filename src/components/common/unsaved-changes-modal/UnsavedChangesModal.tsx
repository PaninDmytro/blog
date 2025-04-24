import React from 'react';

import { Modal } from '../modal/Modal';
import { Button } from '../button/Button';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeave: () => void;
}

export const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen,
  onClose,
  onLeave,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unsaved Changes"
    >
      <p className="text-gray-600 mb-6">
        You have unsaved changes. Are you sure you want to leave this page?
      </p>
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onLeave}>
          Leave
        </Button>
      </div>
    </Modal>
  );
}; 