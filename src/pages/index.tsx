import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, useRef } from 'react';

import { POSTS_PER_PAGE } from '@/constants/posts';
import { SortOrder } from '@/types/posts';

import { useGetPostsQuery } from '../api/posts-api';
import { PostsHeader } from '../components/posts/header/PostsHeader';
import { PostsList } from '../components/posts/list/PostsList';



const Home: NextPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const searchQuery = router.query.search as string || '';
  const prevSearchQuery = useRef(searchQuery);

  const { data, isLoading, error } = useGetPostsQuery({
    page: currentPage,
    size: POSTS_PER_PAGE,
    search: searchQuery || undefined,
    sort: sortOrder,
  }, {
    refetchOnMountOrArgChange: true,
  });

  const handleSortChange = useCallback((order: SortOrder) => {
    setSortOrder(order);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (searchQuery !== prevSearchQuery.current) {
      setCurrentPage(1);
      prevSearchQuery.current = searchQuery;
    }
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading posts</div>
      </div>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / POSTS_PER_PAGE);

  return (
    <div className="flex-1 bg-gray-100">
      <main className="container mx-auto px-4 py-8 h-full">
        <PostsHeader 
          sortOrder={sortOrder} 
          onSortChange={handleSortChange}
        />
        <PostsList 
          posts={data?.posts || []} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </main>
    </div>
  );
};

export default Home;
