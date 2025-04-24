import { configureStore } from '@reduxjs/toolkit';

import { postsApi } from '../api/posts-api';
import { commentsApi } from '../api/comments-api';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, commentsApi.middleware),
});
