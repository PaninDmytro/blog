import { Comment } from '../../api/types';

export interface CommentListProps {
  comments: Comment[];
  onDeleteComment: (commentId: string) => void;
} 
