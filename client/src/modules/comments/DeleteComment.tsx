import { useDeleteComment } from 'modules/posts/apiClient';
import { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';

type DeleteCommentProps = {
  postId: string;
  commentId: string;
  onDeleteCommentSucceeded: (commentId: string) => void;
};

const DeleteComment = ({ postId, commentId, onDeleteCommentSucceeded }: DeleteCommentProps) => {
  const { execute: deleteComment, isLoading, isSucceeded } = useDeleteComment(commentId);

  useEffect(() => {
    if (!isSucceeded) return;
    onDeleteCommentSucceeded(commentId);
  }, [commentId, isSucceeded, onDeleteCommentSucceeded]);

  return (
    <button
      onClick={() => {
        if (window.confirm('Are you sure?')) {
          deleteComment();
        }
      }}
    >
      {isLoading ? '...' : <IoIosClose className='text-white' />}
    </button>
  );
};

export default DeleteComment;
