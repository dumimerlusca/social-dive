import classNames from 'classnames';
import useIsIntersecting from 'common/hooks/useIsIntersecting';
import { useNewsfeedPosts } from 'modules/posts/apiClient';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import NewPost from './NewPost';
import NewsfeedPostsList from './NewsfeedPostsList';

type NewsfeedProps = {
  wrapperClassName?: string;
};

const Newsfeed = ({ wrapperClassName }: NewsfeedProps) => {
  const [totalCount, setTotalCount] = useState(2);
  const { data: postsData = [], isLoading } = useNewsfeedPosts(totalCount);
  const [posts, setPosts] = useState(postsData);

  useEffect(() => {
    if (postsData.length === 0) return;
    setPosts(postsData);
  }, [postsData]);

  return (
    <div className={classNames(wrapperClassName)}>
      <NewPost />
      <NewsfeedPostsList isLoading={isLoading} posts={posts ?? []} />
      {isLoading && (
        <div className='flex flex-col gap-5'>
          <Skeleton className='h-[500px]' />
          <Skeleton className='h-[500px]' />
        </div>
      )}
    </div>
  );
};

export default Newsfeed;
