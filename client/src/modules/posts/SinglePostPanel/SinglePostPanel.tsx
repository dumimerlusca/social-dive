import CommentListItem from 'modules/comments/CommentListItem/CommentListItem';
import NewComment from 'modules/comments/NewComment/NewComment';
import { useGetPost, useGetPostComments } from 'modules/posts/apiClient';
import PostHeader from 'modules/posts/components/PostHeader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { postImageUrl } from 'services/api';
import Skeleton from 'react-loading-skeleton';
import LikePost from '../LikePost';
import { FaRegComments } from 'react-icons/fa';
import IComment from 'interfaces/IComment';

const SinglePostPanel = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<IComment[]>([]);

  const { data: post, isLoading } = useGetPost(postId!);
  const { data: commentsData } = useGetPostComments(postId!);

  useEffect(() => {
    if (!commentsData) return;
    if (comments.length !== 0) return;
    setComments(commentsData);
  }, [comments.length, commentsData]);

  if (isLoading)
    return (
      <div className='flex flex-col md:flex-row gap-5'>
        <div className='flex-grow-2'>
          <Skeleton className='h-[700px]' />
        </div>
        <div className='flex-grow-1'>
          <Skeleton className='h-[700px]' />
        </div>
      </div>
    );

  if (!post) return <div>No post found</div>;

  return (
    <div className='mt-10 flex flex-col md:flex-row  md:min-h-[700px]  gap-10 w-full justify-end'>
      <div className='max-h-[700px] overflow-hidden' style={{ flex: '2' }}>
        <img className='w-full h-full object-contain' src={postImageUrl(postId)} alt='' />
      </div>
      <div className='flex max-h-[700px] flex-col bg-primary rounded-xl' style={{ flex: '1' }}>
        <div className='border-b border-secondary p-4'>
          <PostHeader post={post} />
          <div className='flex gap-3 justify-between'>
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
        </div>
        <ul className='flex-grow px-4 py-2  flex flex-col gap-5 overflow-auto'>
          {comments.map((comment) => {
            return (
              <CommentListItem
                onDeleteCommentSucceeded={(commentId) => {
                  setComments((prev) => prev.filter((comment) => comment._id !== commentId));
                }}
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            );
          })}
        </ul>
        <div className='p-3'>
          <NewComment
            onAddCommentSucceeded={(newComment) => {
              setComments((prev) => [newComment, ...prev]);
            }}
            postId={post._id}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPanel;
