import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Button } from '../../common/button/Button';

export const Navbar: React.FC = React.memo(() => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = router.query.search as string;
    if (query) {
      setSearchQuery(query);
    }
  }, [router.query.search]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push({
        pathname: '/',
        query: { search: searchQuery.trim() },
      });
    } else {
      router.push('/');
    }
  }, [router, searchQuery]);

  const handleNewPost = useCallback(() => {
    router.push('/posts/new');
  }, [router]);

  return (
    <>
      <nav className={classNames(
        "bg-white shadow-sm",
        "fixed top-0 left-0 right-0 z-50"
      )}>
        <div className={classNames(
          "container mx-auto px-4",
          "flex flex-col sm:flex-row items-center justify-between gap-3 py-3"
        )}>
          <div className={classNames(
            "flex items-center justify-between w-full sm:w-auto sm:justify-start gap-3"
          )}>
            <h1 className={classNames(
              "text-lg font-semibold text-gray-800",
              "whitespace-nowrap"
            )}>
              Blog App
            </h1>
            
            <form onSubmit={handleSearch} className={classNames(
              "flex-1 sm:flex-none",
              "flex items-center gap-2 w-full sm:w-64"
            )}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={classNames(
                  "px-3 py-1.5 border border-gray-200 rounded-md",
                  "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
                  "w-full text-sm",
                  "bg-gray-50"
                )}
              />
              <Button
                type="submit"
                variant="secondary"
                className={classNames(
                  "px-3 py-1.5 text-sm",
                  "whitespace-nowrap"
                )}
              >
                Search
              </Button>
            </form>
          </div>

          <Button
            onClick={handleNewPost}
            className={classNames(
              "w-full sm:w-auto",
              "px-3 py-1.5 text-sm",
              "whitespace-nowrap"
            )}
          >
            New Post
          </Button>
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer to prevent content from going under navbar */}
    </>
  );
});
