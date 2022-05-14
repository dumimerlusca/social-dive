import React from 'react';
import IPost from '../../../interfaces/IPost';
import NewsfeedPostListItem from './NewsfeedPostListItem';

interface PropTypes {
  posts: IPost[];
  isLoading: boolean;
}

const NewsfeedPostsList: React.FC<PropTypes> = ({ posts, isLoading }) => {
  return (
    <div>
      <h1 className='text-3xl mb-5 ml-5'>Newsfeed</h1>
      <ul>
        {posts.map((post) => {
          return <NewsfeedPostListItem key={post._id} post={post} />;
        })}
      </ul>
    </div>
  );
};

export default NewsfeedPostsList;
