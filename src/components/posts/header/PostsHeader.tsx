import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { SortOrder } from '../../../types/posts';

interface PostsHeaderProps {
  onSortChange: (sort: SortOrder) => void;
  currentSort: SortOrder;
}

export const PostsHeader: React.FC<PostsHeaderProps> = React.memo(({ 
  onSortChange, 
  currentSort 
}) => {
  const router = useRouter();
  const { search } = router.query;

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOrder);
  }, [onSortChange]);

  return (
    <div className={classNames(
      "container mx-auto px-4",
      "pt-20 sm:pt-16"
    )}>
      <div className={classNames(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
        "mb-8"
      )}>
        <h1 className={classNames(
          "text-2xl font-bold text-gray-800",
          "whitespace-nowrap"
        )}>
          {search ? `Search Results for "${search}"` : 'Blog Posts'}
        </h1>

        <div className={classNames(
          "flex items-center gap-4 w-full sm:w-auto"
        )}>
          <select
            value={currentSort}
            onChange={handleSortChange}
            className={classNames(
              "px-3 py-1.5 border border-gray-200 rounded-md",
              "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
              "text-sm bg-gray-50",
              "w-full sm:w-auto"
            )}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
});

PostsHeader.displayName = 'PostsHeader'; 
