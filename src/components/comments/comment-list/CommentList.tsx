import React, { useState } from 'react';
import classNames from 'classnames';

import { CommentListProps } from '../../../types/components/comment.types';
import { Modal } from '../../common/modal/Modal';
import { Button } from '../../common/button/Button';

export const CommentList: React.FC<CommentListProps> = ({ 
  comments, 
  onDeleteComment = () => {}
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (commentId: string) => {
    setCommentToDelete(commentId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (commentToDelete) {
      onDeleteComment(commentToDelete);
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
    }
  };

  if (comments.length === 0) {
    return <p className={classNames(
      "text-gray-500"
    )}>No comments yet.</p>;
  }

  return (
    <div className={classNames(
      "space-y-4"
    )}>
      {comments.map((comment) => (
        <div key={comment.id} className={classNames(
          "bg-white p-4 rounded-lg shadow"
        )}>
          <div className={classNames(
            "flex justify-between items-start"
          )}>
            <div>
              <p className={classNames(
                "text-gray-600"
              )}>{comment.content}</p>
              <p className={classNames(
                "text-sm text-gray-400 mt-2"
              )}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="danger"
              onClick={() => handleDeleteClick(comment.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Comment"
      >
        <p className={classNames(
          "text-gray-600 mb-6"
        )}>Are you sure you want to delete this comment?</p>
        <div className={classNames(
          "flex justify-end space-x-4"
        )}>
          <Button
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
