import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Post } from '../../../api/types';


interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = React.memo(({ post }) => {
  const router = useRouter();

  return (
    <div 
      className={classNames(
        "bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      )}
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <h2 className={classNames(
        "text-xl font-semibold mb-2"
      )}>{post.title}</h2>
      <p className={classNames(
        "text-gray-600 mb-4 line-clamp-3"
      )}>{post.content}</p>
      <div className={classNames(
        "flex justify-between items-center"
      )}>
        <span className={classNames(
          "text-sm text-gray-500"
        )}>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <div className={classNames(
          "flex items-center gap-2"
        )}>
          <span className={classNames(
            "text-sm text-gray-500"
          )}>
            {post.commentsCount} comments
          </span>
          <Link 
            href={`/posts/${post.id}`}
            className={classNames(
              "text-blue-500 hover:text-blue-600"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
});
