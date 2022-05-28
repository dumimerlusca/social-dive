import { forwardRef } from 'react';
import IPost from '../../../interfaces/IPost';
import { FaRegComments, FaShare } from 'react-icons/fa';
import { BASE_API_URL } from 'services/api';
import LikePost from 'modules/posts/LikePost';

import PostHeader from 'modules/posts/components/PostHeader';
import CommentListItem from 'modules/comments/CommentListItem/CommentListItem';
import NewComment from 'modules/comments/NewComment/NewComment';
import usePostComments from 'modules/comments/usePostComments';

interface PropTypes {
  post: IPost;
}

const NewsfeedPostListItem = forwardRef<HTMLLIElement, PropTypes>(({ post }, ref) => {
  const { comments, onAddCommentSucceeded, onDeleteCommentSucceeded } = usePostComments(post._id);

  return (
    <li ref={ref} className='p-5 bg-primary mb-10 rounded-xl'>
      <PostHeader post={post} />

      {post.description && <p className='py-2'>{post.description}</p>}
      {post.photo && <img className='w-full' src={BASE_API_URL + `/posts/${post._id}/photo`} alt='avatar' />}

      <div className='flex justify-between pt-5'>
        <LikePost postId={post._id} initialLikes={post.likes} />
        <div className='flex items-center gap-2'>
          <button>
            <FaRegComments className='text-secondary text-4xl' />
          </button>
          <span>{comments.length} Comments</span>
        </div>
        <div className='flex items-center gap-2'>
          <button>
            <FaShare className='text-blue-500 text-4xl' />
          </button>
          <span>{0} Shares</span>
        </div>
      </div>

      <div>
        <NewComment onAddCommentSucceeded={onAddCommentSucceeded} postId={post._id} wrapperClassname='my-2' />
        <ul className='flex flex-col gap-1 max-h-[300px] overflow-auto p-2'>
          {comments.map((comment) => {
            return (
              <CommentListItem
                onDeleteCommentSucceeded={onDeleteCommentSucceeded}
                key={comment._id}
                postId={post._id}
                comment={comment}
              />
            );
          })}
        </ul>
      </div>
    </li>
  );
});

export default NewsfeedPostListItem;
