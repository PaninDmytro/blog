import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGetPostQuery, useUpdatePostMutation } from '../../../api/posts-api';
import { PostForm } from '../../../components/posts/post-form/PostForm';
import { PostFormData } from '../../../utils/validation';

interface EditPostPageProps {
  id: string;
}

const EditPostPage: NextPage<EditPostPageProps> = ({ id }) => {
  const router = useRouter();
  const { data: post, isLoading, error: fetchError } = useGetPostQuery(id);
  const [updatePost, { isLoading: isUpdating, error: updateError }] = useUpdatePostMutation();

  const handleSubmit = async (data: PostFormData) => {
    try {
      await updatePost({ id, data }).unwrap();
      router.push(`/posts/${id}`);
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading post...</div>
      </div>
    );
  }

  if (fetchError) {
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
        <PostForm 
          defaultValues={post} 
          onSubmit={handleSubmit} 
          error={updateError?.toString()} 
          isEdit={true}
        />
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

export default EditPostPage; 
