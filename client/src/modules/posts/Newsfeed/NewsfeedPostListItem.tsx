import React, { forwardRef } from 'react';
import IPost from '../../../interfaces/IPost';
import { FaRegComments, FaShare } from 'react-icons/fa';
import { BASE_API_URL } from 'services/api';
import LikePost from 'modules/posts/LikePost';
import CommentListItem from 'modules/comments/CommentListItem/CommentListItem';
import NewComment from 'modules/comments/NewComment/NewComment';
import { useGetPostComments } from 'modules/posts/apiClient';

import PostHeader from 'modules/posts/components/PostHeader';

interface PropTypes {
  post: IPost;
}

const NewsfeedPostListItem = forwardRef<HTMLLIElement, PropTypes>(({ post }, ref) => {
  const { _id, description, likes, photo } = post;

  const { data: comments = [] } = useGetPostComments(_id);

  return (
    <li ref={ref} className='p-5 bg-primary mb-10 rounded-xl'>
      <PostHeader post={post} />

      {description && <p className='py-2'>{description}</p>}
      {photo && <img className='w-full' src={BASE_API_URL + `/posts/${_id}/photo`} alt='avatar' />}

      <div className='flex justify-between pt-5'>
        <LikePost postId={_id} likes={likes} />
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
        <NewComment postId={_id} wrapperClassname='my-2' />
        <ul className='flex flex-col gap-1 max-h-[300px] overflow-auto p-2'>
          {comments.map((comment) => {
            return <CommentListItem key={comment._id} postId={_id} comment={comment} />;
          })}
        </ul>
      </div>
    </li>
  );
});

export default NewsfeedPostListItem;
