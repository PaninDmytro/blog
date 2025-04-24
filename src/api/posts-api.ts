import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Post, PostCreateRequest, PostResponse, PostsParams } from './types';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostResponse, PostsParams>({
      query: (params) => ({
        url: '/posts',
        params: {
          page: params.page,
          size: params.size,
          search: params.search,
          sort: params.sort,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { page, size, search, sort } = queryArgs;
        return `${endpointName}-${page}-${size}-${search || ''}-${sort || ''}`;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        if (!currentArg || !previousArg) return true;
        return (
          currentArg.page !== previousArg.page ||
          currentArg.size !== previousArg.size ||
          currentArg.search !== previousArg.search ||
          currentArg.sort !== previousArg.sort
        );
      },
      providesTags: (result, error, arg) => {
        if (error || !result) return [{ type: 'Post', id: 'LIST' }];
        
        const tags = result.posts.map(({ id }) => ({ type: 'Post' as const, id }));
        tags.push({ type: 'Post', id: 'LIST' });
        
        if (arg.search) {
          tags.push({ type: 'Post', id: `SEARCH-${arg.search}` });
        }
        
        return tags;
      },
      keepUnusedDataFor: 60,
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
      keepUnusedDataFor: 60,
    }),
    createPost: builder.mutation<Post, PostCreateRequest>({
      query: (data) => ({
        url: '/posts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation<Post, { id: string; data: PostCreateRequest }>({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: 'SEARCH-*' }
      ],
      onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData('getPost', id, (draft) => {
              Object.assign(draft, updatedPost);
            })
          );
        } catch (error) {
          console.error('Failed to update post:', error);
        }
      },
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' }
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi; 
