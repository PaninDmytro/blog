import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useCreatePostMutation } from '../../api/posts-api';
import { PostForm } from '../../components/posts/post-form/PostForm';
import { PostFormData } from '../../utils/validation';

const NewPostPage: NextPage = () => {
  const router = useRouter();
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  const handleSubmit = async (data: PostFormData) => {
    try {
      const result = await createPost(data).unwrap();
      router.push(`/posts/${result.id}`);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <div className="flex-1 bg-gray-100">
      <main className="container mx-auto px-4 py-8 h-full">
        <PostForm 
          onSubmit={handleSubmit} 
          error={error?.toString()} 
          backUrl={router.query.id ? `/posts/${router.query.id}` : '/'}
        />
      </main>
    </div>
  );
};

export default NewPostPage;
