import React from 'react';
import classNames from 'classnames';

import { PostsListProps } from '../../../types/components/post.types';
import { PostCard } from '../post-card/PostCard';
import { Pagination } from '../../common/pagination/Pagination';

export const PostsList: React.FC<PostsListProps> = React.memo(({ 
  posts, 
  currentPage, 
  totalPages, 
  onPageChange,
  searchQuery
}) => {
  if (posts.length === 0) {
    return (
      <div className={classNames(
        "text-center py-8"
      )}>
        <p className={classNames(
          "text-gray-600"
        )}>
          {searchQuery 
            ? `No posts found matching "${searchQuery}"`
            : 'No posts found'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {searchQuery && (
        <div className={classNames(
          "mb-4 text-gray-600"
        )}>
          Showing results for "{searchQuery}"
        </div>
      )}
      <div className={classNames(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      )}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}); 