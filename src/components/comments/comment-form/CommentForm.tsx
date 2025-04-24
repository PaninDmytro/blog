import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';

import { Button } from "../../common/button/Button";
import { Input } from "../../common/input/Input";
import { CommentFormData, commentSchema } from "../../../utils/validation";
import { useCreateCommentMutation } from "../../../api/comments-api";

interface CommentFormProps {
  postId: string;
}

export const CommentForm: React.FC<CommentFormProps> = React.memo(({ postId }) => {
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = useCallback(
    async (data: CommentFormData) => {
      try {
        await createComment({ postId, content: data.content }).unwrap();
        reset();
      } catch (err) {
        console.error('Failed to add comment:', err);
      }
    },
    [createComment, postId, reset]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classNames(
      "mt-4"
    )}>
      <Input
        name="content"
        placeholder="Add a comment"
        register={register}
        error={errors.content?.message}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Add Comment'}
      </Button>
    </form>
  );
});
