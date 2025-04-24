import { GetServerSideProps, NextPage } from 'next';

import { useGetPostQuery } from '../../api/posts-api';
import { PostDetail } from '../../components/posts/post-detail/PostDetail';

interface PostPageProps {
  id: string;
}

const PostPage: NextPage<PostPageProps> = ({ id }) => {
  const { data: post, isLoading, error } = useGetPostQuery(id);

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading post</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Post not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100">
      <main className="container mx-auto px-4 py-8 h-full">
        <PostDetail post={post} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  return {
    props: {
      id,
    },
  };
};

export default PostPage;
