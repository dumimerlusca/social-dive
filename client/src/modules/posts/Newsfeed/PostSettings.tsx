import { NotificationTypesEnum } from 'components/Notification';
import { useDeletePost } from 'modules/posts/apiClient';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { showNotification } from 'store/ui/uiSlice';
import useNewsfeedContext from '../context/newsfeedContext';

const liClasses = 'px-7 py-2 hover:bg-gray-300 transition-all duration-300';

type PostSettingsProps = {
  postId: string;
};

const PostSettings = ({ postId }: PostSettingsProps) => {
  const { execute: deletePost, isSucceeded } = useDeletePost(postId);
  const { postId: postIdParam } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onDeletePostsSucceeded } = useNewsfeedContext();

  useEffect(() => {
    if (!isSucceeded) return;
    dispatch(
      showNotification({
        text: 'Post deleted successfuly!',
        type: NotificationTypesEnum.success,
        autoDismiss: 2000,
      }),
    );
    // For the indivial post page
    if (postIdParam) {
      navigate('/');
      return;
    }
    // For the newsfeed page
    setTimeout(() => {
      onDeletePostsSucceeded(postId);
    }, 2);
  }, [dispatch, isSucceeded, navigate, onDeletePostsSucceeded, postId, postIdParam]);

  return (
    <div className='bg-white text-gray-900'>
      <ul className='flex flex-col text-lg font-medium'>
        <li
          className={liClasses}
          onClick={() => {
            if (window.confirm('Are you sure?')) {
              deletePost();
            }
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
