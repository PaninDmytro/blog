import { Post } from '../../api/types';

export interface PostsListProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  searchQuery?: string;
}
