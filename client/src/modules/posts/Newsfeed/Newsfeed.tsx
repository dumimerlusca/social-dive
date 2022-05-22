import classNames from 'classnames';
import IPost from 'interfaces/IPost';
import { useNewsfeedPosts } from 'modules/posts/apiClient';
import { useCallback, useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import NewPost from './NewPost';
import NewsfeedPostListItem from './NewsfeedPostListItem';

type NewsfeedProps = {
  wrapperClassName?: string;
};

const LIMIT = 2;

const Newsfeed = ({ wrapperClassName }: NewsfeedProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalDocumentsCount, setTotalDocumentsCount] = useState(0);
  const { data: newsfeedPostsData, isLoading } = useNewsfeedPosts(pageNumber, LIMIT);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (!newsfeedPostsData?.count) return;
    setTotalDocumentsCount(newsfeedPostsData.count);
  }, [newsfeedPostsData?.count]);

  useEffect(() => {
    if (!newsfeedPostsData) return;
    if (Number(newsfeedPostsData.page) !== pageNumber) return;
    if (posts.length >= pageNumber * LIMIT) return;
    setPosts((prev) => [...prev, ...newsfeedPostsData.data]);
  }, [newsfeedPostsData, pageNumber, posts.length]);

  const observer = useRef<IntersectionObserver | null>(null);

  const hasMore = pageNumber < Math.ceil(totalDocumentsCount / LIMIT);

  const lastPostElementRef = useCallback(
    (node) => {
      if (!node) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          if (isLoading) return;
          if (!hasMore) return;
          if (!entries[0].isIntersecting) return;
          setPageNumber((prev) => prev + 1);
        },
        { threshold: 0.5 },
      );

      observer.current.observe(node);
    },
    [hasMore, isLoading],
  );

  return (
    <div className={classNames(wrapperClassName)}>
      <NewPost />
      <div>
        <h1 className='text-3xl mb-5 ml-5'>Newsfeed</h1>
        <ul>
          {posts.map((post, index) => {
            if (index === posts.length - 1) {
              return <NewsfeedPostListItem ref={lastPostElementRef} key={post._id} post={post} />;
            }
            return <NewsfeedPostListItem key={post._id} post={post} />;
          })}
        </ul>
        {isLoading && (
          <div className='flex flex-col gap-5'>
            <Skeleton className='h-[500px]' />
            <Skeleton className='h-[500px]' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsfeed;
