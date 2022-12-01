import { forwardRef, useCallback, useEffect, useState } from 'react';
import IPost from '../../../interfaces/IPost';
import { FaRegComments } from 'react-icons/fa';
import { BASE_API_URL } from 'services/api';
import LikePost from 'modules/posts/LikePost';

import PostHeader from 'modules/posts/components/PostHeader';
import CommentListItem from 'modules/comments/CommentListItem/CommentListItem';
import NewComment from 'modules/comments/NewComment/NewComment';
import usePostComments from 'modules/comments/usePostComments';
import EditPostDescriptionForm from '../components/EditPostDescriptionForm';

interface PropTypes {
  post: IPost;
}

const NewsfeedPostListItem = forwardRef<HTMLLIElement, PropTypes>(({ post }, ref) => {
  const [innerPost, setInnerPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false);
  const { comments, onAddCommentSucceeded, onDeleteCommentSucceeded } = usePostComments(
    innerPost._id,
  );

  useEffect(() => {
    setInnerPost(post);
  }, [post]);

  const onClickEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onEditSuccess = useCallback((updatedPost: IPost) => {
    setInnerPost(updatedPost);
    setIsEditing(false);
  }, []);

  return (
    <li ref={ref} className='p-5 bg-primary mb-10 rounded-xl'>
      <PostHeader onClickEdit={onClickEdit} post={innerPost} />
      {isEditing ? (
        <EditPostDescriptionForm
          onSuccess={onEditSuccess}
          description={innerPost.description ?? ''}
          postId={innerPost._id}
        />
      ) : (
        <p className='py-2'>{innerPost.description}</p>
      )}

      {post.photo && (
        <img className='w-full' src={BASE_API_URL + `/posts/${innerPost._id}/photo`} alt='avatar' />
      )}

      <div className='flex justify-between pt-5 gap-2'>
        <LikePost post={post} initialLikes={post.likes} />
        <div className='flex items-center gap-2'>
          <FaRegComments className='text-secondary text-4xl' />
          <p>{comments.length}</p>
          <p className='hidden sm:block'>Comments</p>
        </div>
        {/* <div className='flex items-center gap-2'>
          <button>
            <FaShare className='text-blue-500 text-4xl' />
          </button>
          <p>{0}</p>
          <p className='hidden sm:block'>Shares</p>
        </div> */}
      </div>

      <div>
        <NewComment
          onAddCommentSucceeded={onAddCommentSucceeded}
          postId={innerPost._id}
          wrapperClassname='my-2'
        />
        <ul className='flex flex-col gap-1 max-h-[300px] overflow-auto p-2'>
          {comments.map((comment) => {
            return (
              <CommentListItem
                onDeleteCommentSucceeded={onDeleteCommentSucceeded}
                key={comment._id}
                postId={innerPost._id}
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
