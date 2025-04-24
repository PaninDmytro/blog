import React from 'react';
import classNames from 'classnames';

import { Button } from '../button/Button';
import { PaginationProps } from '../../../types/components/pagination.types';

export const Pagination: React.FC<PaginationProps> = React.memo(({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <div className={classNames(
      "flex justify-center gap-2"
    )}>
      <Button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className={classNames(
        "px-4 py-2"
      )}>
        Page {currentPage} of {totalPages}
      </span>
      <Button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}); 