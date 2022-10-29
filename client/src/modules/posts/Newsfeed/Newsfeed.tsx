import classNames from 'classnames';
import { useCallback, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import useNewsfeedContext from '../context/newsfeedContext';
import NewPost from './NewPost';
import NewsfeedPostListItem from './NewsfeedPostListItem';

type NewsfeedProps = {
  wrapperClassName?: string;
};

const LIMIT = 2;

const Newsfeed = ({ wrapperClassName }: NewsfeedProps) => {
  const { pageNumber, totalDocumentsCount, setPageNumber, isLoading, posts } = useNewsfeedContext();

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
          setPageNumber((prev: number) => prev + 1);
        },
        { threshold: 0.5 },
      );

      observer.current.observe(node);
    },
    [hasMore, isLoading, setPageNumber],
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
        {posts.length === 0 && !isLoading && (
          <p className='text-center text-4xl mt-40'>Your newsfeed is empty!</p>
        )}
      </div>
    </div>
  );
};

export default Newsfeed;
