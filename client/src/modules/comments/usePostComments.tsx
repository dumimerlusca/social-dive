import { queryKeys } from 'common/constansts';
import IComment from 'interfaces/IComment';
import { useGetPostComments } from 'modules/posts/apiClient';
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

const usePostComments = (postId: string) => {
  const { data: currentComments = [] } = useGetPostComments(postId);
  const [comments, setComments] = useState(currentComments);

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.setQueryDefaults(queryKeys.postComments(postId), { enabled: false });
    };
  }, [postId, queryClient]);

  const onAddCommentSucceeded = useCallback((newComment: IComment) => {
    setComments((prev) => [newComment, ...prev]);
  }, []);

  const onDeleteCommentSucceeded = useCallback((commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment._id !== commentId));
  }, []);

  useEffect(() => {
    if (currentComments.length === 0) return;
    setComments(currentComments);
  }, [currentComments]);
  return { onAddCommentSucceeded, onDeleteCommentSucceeded, comments };
};

export default usePostComments;
