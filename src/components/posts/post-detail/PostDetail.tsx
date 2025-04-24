import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { useDeletePostMutation } from '../../../api/posts-api';
import { useGetCommentsQuery, useDeleteCommentMutation } from '../../../api/comments-api';
import { Post } from '../../../api/types';
import { CommentList } from "../../comments/comment-list/CommentList";
import { CommentForm } from "../../comments/comment-form/CommentForm";
import { Button } from "../../common/button/Button";
import { Modal } from "../../common/modal/Modal";

interface PostDetailProps {
  post: Post;
}

export const PostDetail: React.FC<PostDetailProps> = React.memo(({ post }) => {
  const router = useRouter();
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { data: comments = [] } = useGetCommentsQuery(post.id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleBack = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleEdit = useCallback(() => {
    router.push(`/posts/${post.id}/edit`);
  }, [router, post.id]);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deletePost(post.id).unwrap();
      router.push('/');
    } catch (err) {
      console.error('Failed to delete post:', err);
    } finally {
      setShowDeleteModal(false);
    }
  }, [deletePost, post.id, router]);

  const handleDeleteComment = useCallback(async (commentId: string) => {
    try {
      await deleteComment({ postId: post.id, commentId }).unwrap();
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  }, [deleteComment, post.id]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Button onClick={handleBack} variant="secondary">
          ← Back to Posts
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex space-x-2">
            <Button onClick={handleEdit} disabled={isLoading}>
              Edit
            </Button>
            <Button onClick={handleDeleteClick} disabled={isLoading} variant="danger">
              Delete
            </Button>
          </div>
        </div>
        <div className="text-gray-600 mb-4">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="prose max-w-none">
          {post.content}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentList comments={comments} onDeleteComment={handleDeleteComment} />
        <CommentForm postId={post.id} />
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Post"
      >
        <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
});
