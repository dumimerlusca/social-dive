import { useDeletePost } from 'modules/posts/apiClient';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import useNewsfeedContext from '../context/newsfeedContext';

const liClasses = 'px-7 py-2 hover:bg-gray-300 transition-all duration-300';

type PostSettingsProps = {
  postId: string;
};

const PostSettings = ({ postId }: PostSettingsProps) => {
  const { execute: deletePost, isSucceeded } = useDeletePost(postId);
  const { postId: postIdParam } = useParams();
  const navigate = useNavigate();

  const { onDeletePostsSucceeded } = useNewsfeedContext();

  useEffect(() => {
    if (!isSucceeded) return;
    // For the indivial post page
    if (postIdParam) {
      navigate('/');
      return;
    }
    // For the newsfeed page
    setTimeout(() => {
      onDeletePostsSucceeded(postId);
    }, 2);
  }, [isSucceeded, navigate, onDeletePostsSucceeded, postId, postIdParam]);

  return (
    <div className='bg-white text-gray-900'>
      <ul className='flex flex-col text-lg font-medium'>
        <li
          className={liClasses}
          onClick={() => {
            if (window.confirm('Are you sure?')) deletePost();
          }}
        >
          Delete
        </li>
        <li className={liClasses}>Edit</li>
      </ul>
    </div>
  );
};

export default PostSettings;
