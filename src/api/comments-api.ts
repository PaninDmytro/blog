import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Comment } from './types';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (result, error, postId) => 
        result 
          ? [
              ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
              { type: 'Comment', id: `POST-${postId}` }
            ]
          : [{ type: 'Comment', id: `POST-${postId}` }],
    }),
    createComment: builder.mutation<Comment, { postId: string; content: string }>({
      query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Comment', id: `POST-${postId}` }],
    }),
    deleteComment: builder.mutation<void, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Comment', id: `POST-${postId}` }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi; 