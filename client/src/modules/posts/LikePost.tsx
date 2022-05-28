import IUser from 'interfaces/IUser';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import usePostLikes from './usePostLikes';

type LikePostProps = {
  initialLikes: IUser[];
  postId: string;
};

const LikePost = ({ initialLikes, postId }: LikePostProps) => {
  const { onClick, isPostLiked, likes, isLoading } = usePostLikes(initialLikes, postId);

  return (
    <div className='flex items-center gap-2'>
      <button disabled={isLoading} onClick={onClick}>
        {isPostLiked ? (
          <AiFillHeart className='text-red-500 text-4xl' />
        ) : (
          <AiOutlineHeart className='text-red-500 text-4xl' />
        )}
      </button>
      <span className='font-light'>{likes.length} Likes</span>
    </div>
  );
};

export default LikePost;
