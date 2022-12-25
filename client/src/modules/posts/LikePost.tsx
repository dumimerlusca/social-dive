import { useTranslate } from '@tolgee/react';
import IPost from 'interfaces/IPost';
import IUser from 'interfaces/IUser';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import usePostLikes from './usePostLikes';

type LikePostProps = {
  initialLikes: IUser[];
  post: IPost;
};

const LikePost = ({ initialLikes, post }: LikePostProps) => {
  const { onClick, isPostLiked, likes, isLoading } = usePostLikes(initialLikes, post);
  const t = useTranslate();
  return (
    <div className='flex items-center gap-2'>
      <button disabled={isLoading} onClick={onClick}>
        {isPostLiked ? (
          <AiFillHeart className='text-red-500 text-4xl' />
        ) : (
          <AiOutlineHeart className='text-red-500 text-4xl' />
        )}
      </button>
      <span className='font-light'>{likes.length}</span>
      <p className='hidden sm:block'>{t('labels.likes')}</p>
    </div>
  );
};

export default LikePost;
