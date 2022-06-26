import IPost from 'interfaces/IPost';
import IUser from 'interfaces/IUser';
import { useCallback, useEffect, useState } from 'react';
import postsService from 'services/posts.service';
import useSocketContext from 'socket/socketContext';
import { getCurrentUser } from 'store/selectors/appSelectors';
import { useAppSelector } from 'store/store';
import { useLikePost, useUnlikePost } from './apiClient';

const usePostLikes = (initialLikes: IUser[], post: IPost) => {
  const [likes, setLikes] = useState(initialLikes);
  const { socket } = useSocketContext();

  const {
    execute: likePost,
    isSucceeded: isLikePostSucceeded,
    isLoading: isLoadingLikePost,
  } = useLikePost(post._id);
  const {
    execute: unlikePost,
    isSucceeded: isUnlikePostSucceeded,
    isLoading: isLoadingUnlikePost,
  } = useUnlikePost(post._id);

  const isLoading = isLoadingLikePost || isLoadingUnlikePost;
  const currentUser = useAppSelector(getCurrentUser);

  const [isPostLiked, setIsPostLiked] = useState(postsService.isItemLiked(likes, currentUser?._id));

  const onClick = useCallback(() => {
    if (isPostLiked) {
      unlikePost();
      return;
    }
    likePost();
  }, [isPostLiked, likePost, unlikePost]);

  useEffect(() => {
    if (!isLikePostSucceeded) return;
    setIsPostLiked(true);
    socket.emit('likePost', { to: post.user, from: currentUser, postId: post._id });
    setLikes((prev) => [...prev, currentUser]);
  }, [currentUser, isLikePostSucceeded, post._id, post.user, socket]);

  useEffect(() => {
    if (!isUnlikePostSucceeded) return;
    setIsPostLiked(false);
    setLikes((prev) => prev.filter((user) => user._id !== currentUser._id));
  }, [currentUser, isUnlikePostSucceeded]);

  return { likes, onClick, isPostLiked, isLoading };
};

export default usePostLikes;
