import * as z from 'zod';

export const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(500, 'Comment must be less than 500 characters'),
});

export type PostFormData = z.infer<typeof postSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;
