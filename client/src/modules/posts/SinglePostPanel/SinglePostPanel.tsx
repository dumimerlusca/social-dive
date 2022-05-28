import CommentListItem from 'modules/comments/CommentListItem/CommentListItem';
import NewComment from 'modules/comments/NewComment/NewComment';
import { useGetPost, useGetPostComments } from 'modules/posts/apiClient';
import PostHeader from 'modules/posts/components/PostHeader';
import React from 'react';
import { useParams } from 'react-router';
import { postImageUrl } from 'services/api';
import Skeleton from 'react-loading-skeleton';

const SinglePostPanel = () => {
  const { postId } = useParams();

  const { data: post, isLoading } = useGetPost(postId!);
  const { data: comments = [] } = useGetPostComments(postId!);

  if (isLoading)
    return (
      <div className='flex gap-5'>
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
    <div className='mt-10 flex h-[700px]  gap-10'>
      <div className='flex-grow-0'>
        <img className='w-full h-full object-contain' src={postImageUrl(postId)} alt='' />
      </div>
      <div className='flex flex-1 flex-col bg-primary rounded-xl min-w-[350px]'>
        <PostHeader wrapperClassName='p-4 border-b border-secondary' post={post} />

        <ul className='flex-grow px-4 py-2 flex flex-col gap-5 overflow-auto'>
          {comments.map((comment) => {
            return (
              <CommentListItem
                onDeleteCommentSucceeded={() => {}}
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            );
          })}
        </ul>
        <div className='p-3'>
          <NewComment onAddCommentSucceeded={() => {}} postId={post._id} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPanel;
