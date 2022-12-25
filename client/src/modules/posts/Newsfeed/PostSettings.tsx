import { useTranslate } from '@tolgee/react';
import { NotificationTypesEnum } from 'components/Notification';
import { useDeletePost } from 'modules/posts/apiClient';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { showNotification } from 'store/ui/uiSlice';
import useNewsfeedContext from '../context/newsfeedContext';

const liClasses = 'px-7 py-2 hover:bg-gray-300 transition-all duration-300';

type PostSettingsProps = {
  postId: string;
  onClickEdit: () => void;
  closeDropdown: () => void;
};

const PostSettings = ({ postId, onClickEdit, closeDropdown }: PostSettingsProps) => {
  const deletePost = useDeletePost(postId);
  const { postId: postIdParam } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onDeletePostsSucceeded } = useNewsfeedContext();

  useEffect(() => {
    if (!deletePost.isSucceeded) return;
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
  }, [deletePost.isSucceeded, dispatch, navigate, onDeletePostsSucceeded, postId, postIdParam]);

  const t = useTranslate();

  return (
    <div className='bg-white text-gray-900'>
      <ul className='flex flex-col text-lg font-medium'>
        <li
          className={liClasses}
          onClick={() => {
            closeDropdown();
            if (window.confirm(t('confirmation.areYouSure'))) {
              deletePost.execute();
            }
          }}
        >
          {t('labels.actions.delete')}
        </li>
        <li
          onClick={() => {
            closeDropdown();
            onClickEdit();
          }}
          className={liClasses}
        >
          {t('labels.actions.edit')}
        </li>
      </ul>
    </div>
  );
};

export default PostSettings;
