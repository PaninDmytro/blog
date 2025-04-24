export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  commentsCount: number;
}

export interface PostResponse {
  posts: Post[];
  total: number;
  page: number;
  size: number;
}

export interface PostCreateRequest {
  title: string;
  content: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export interface PostsParams {
  page?: number;
  size?: number;
  search?: string;
  sort?: 'newest' | 'oldest';
}
