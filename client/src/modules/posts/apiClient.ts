import { queryKeys } from 'common/constansts';
import useAsyncFunction from 'common/hooks/useAsyncFunction';
import { PaginatedData } from 'common/types';
import IComment from 'interfaces/IComment';
import IPost from 'interfaces/IPost';
import { useQuery } from 'react-query';
import { APIdelete, get, patch, post } from 'services/api';

export const useCreatePost = () => {
  const createPost = async (formData: FormData) => {
    const res = await post('/posts', formData);
    return res.data;
  };
  return useAsyncFunction<IPost>(createPost);
};

export const useGetPost = (postId: string) => {
  const getPost = async () => {
    const res = await get(`/posts/${postId}`);
    return res.data;
  };
  return useQuery<IPost>(queryKeys.post(postId), getPost);
};

export const useNewsfeedPosts = (pageNumber: number, limit: number) => {
  const getPosts = async (data: any) => {
    const res = await get(`/posts/newsfeed?page=${pageNumber}&limit=${limit}`);
    return res.data;
  };
  return useQuery<PaginatedData<IPost>>([queryKeys.newsfeedPosts, pageNumber, limit], getPosts);
};

export const useUserPosts = (userId: string) => {
  const getUserPosts = async () => {
    const res = await get(`/posts?user=${userId}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IPost[]>(queryKeys.userPosts(userId), getUserPosts);
  return { data, isLoading, error };
};

export const useLikePost = (postId: string) => {
  const likePost = () => patch(`/posts/${postId}/like`);
  return useAsyncFunction(likePost);
};

export const useUnlikePost = (postId: string) => {
  const unlikePost = () => patch(`/posts/${postId}/unlike`);
  return useAsyncFunction(unlikePost);
};

export const useLikeComment = (commentId: string) => {
  const likeComment = () => patch(`/comments/${commentId}/like`);
  return useAsyncFunction(likeComment);
};

export const useUnlikeComment = (commentId: string) => {
  const unlikeComment = () => patch(`/comments/${commentId}/unlike`);
  return useAsyncFunction(unlikeComment);
};

export const useAddComment = (postId: string, text: string) => {
  const addComment = async () => {
    const res = await post(`/comments/post/${postId}/addComment`, { text });
    return res.data;
  };

  return useAsyncFunction<IComment>(addComment);
};

export const useDeleteComment = (commentId: string) => {
  const deleteComment = () => APIdelete(`/comments/${commentId}`);
  return useAsyncFunction(deleteComment);
};

export const useGetPostComments = (postId: string) => {
  const getPostComments = async () => {
    const res = await get(`/comments/post/${postId}`);
    return res.data;
  };
  return useQuery<IComment[]>(queryKeys.postComments(postId), getPostComments, { retry: false });
};

export const useDeletePost = (postId: string) => {
  const deleteComment = () => APIdelete(`/posts/${postId}`);
  return useAsyncFunction(deleteComment);
};
