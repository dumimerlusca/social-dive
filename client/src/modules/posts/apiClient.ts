import { queryKeys } from 'common/constansts';
import IComment from 'interfaces/IComment';
import IPost from 'interfaces/IPost';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { APIdelete, get, patch, post } from 'services/api';
import { getCurrentUser } from 'store/selectors/appSelectors';
import { useAppSelector } from 'store/store';

export const useCreatePost = () => {
  const createPost = async (formData: FormData) => {
    await post('/posts', formData);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(createPost, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.newsfeedPosts);
    },
  });
  return { ...mutation };
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
  return useQuery<{ page: number; limit: number; count: number; data: IPost[] }>(
    [queryKeys.newsfeedPosts, pageNumber, limit],
    getPosts,
  );
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
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(getCurrentUser);

  const mutation = useMutation(likePost, {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKeys.newsfeedPosts);
      const previousData = queryClient.getQueryData(queryKeys.newsfeedPosts);
      queryClient.setQueryData(queryKeys.newsfeedPosts, (previousData: any) => {
        return previousData.map((post: IPost) => {
          if (post._id !== postId) return post;
          return {
            ...post,
            likes: [...post.likes, currentUser],
          };
        });
      });

      return { previousData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKeys.newsfeedPosts, context?.previousData ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.newsfeedPosts);
    },
  });

  return { ...mutation };
};

export const useUnlikePost = (postId: string) => {
  const unlikePost = () => patch(`/posts/${postId}/unlike`);
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(getCurrentUser);

  const mutation = useMutation(unlikePost, {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKeys.newsfeedPosts);
      const previousData = queryClient.getQueryData(queryKeys.newsfeedPosts);
      queryClient.setQueryData(queryKeys.newsfeedPosts, (previousData: any) => {
        return previousData.map((post: IPost) => {
          if (post._id !== postId) return post;
          return {
            ...post,
            likes: post.likes.filter((user) => user._id !== currentUser?._id),
          };
        });
      });

      return { previousData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKeys.newsfeedPosts, context?.previousData ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.newsfeedPosts);
    },
  });

  return { ...mutation };
};

export const useLikeComment = (postId: string, commentId: string) => {
  const likeComment = () => patch(`/comments/${commentId}/like`);
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(getCurrentUser);

  const mutation = useMutation(likeComment, {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKeys.postComments(postId));
      const previousData = queryClient.getQueryData(queryKeys.postComments(postId));

      queryClient.setQueryData(queryKeys.postComments(postId), (previousData: any) => {
        return previousData.map((comment: IComment) => {
          if (comment._id !== commentId) return comment;
          return {
            ...comment,
            likes: [...comment.likes, currentUser],
          };
        });
      });

      return { previousData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKeys.newsfeedPosts, context?.previousData ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.newsfeedPosts);
    },
  });

  return { ...mutation };
};

export const useUnlikeComment = (postId: string, commentId: string) => {
  const unlikeComment = () => patch(`/comments/${commentId}/unlike`);
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(getCurrentUser);

  const mutation = useMutation(unlikeComment, {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKeys.postComments(postId));
      const previousData = queryClient.getQueryData(queryKeys.postComments(postId));

      queryClient.setQueryData(queryKeys.postComments(postId), (previousData: any) => {
        return previousData.map((comment: IComment) => {
          if (comment._id !== commentId) return comment;
          return {
            ...comment,
            likes: comment.likes.filter((user) => user._id !== currentUser?._id),
          };
        });
      });

      return { previousData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKeys.postComments(postId), context?.previousData ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.postComments(postId));
    },
  });

  return { ...mutation };
};

export const useAddComment = (postId: string, text: string) => {
  const addComment = () => post(`/comments/post/${postId}/addComment`, { text });
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(getCurrentUser);

  const mutation = useMutation(addComment, {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKeys.newsfeedPosts);
      const previousData = queryClient.getQueryData(queryKeys.postComments(postId));

      const newComment: IComment = {
        _id: Math.random().toString(),
        postId: postId,
        user: currentUser!,
        text: text,
        likes: [],
        createdAt: Date.now() as any,
        updatedAt: Date.now() as any,
      };

      queryClient.setQueriesData(queryKeys.postComments(postId), (previousData: any) => {
        return [newComment, ...previousData];
      });

      return { previousData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKeys.postComments(postId), context?.previousData ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.postComments(postId));
    },
  });

  return { ...mutation };
};

export const useDeleteComment = (postId: string, commentId: string) => {
  const deleteComment = () => APIdelete(`/comments/${commentId}`);
  const queryClient = useQueryClient();

  const mutate = useMutation(deleteComment, {
    onSuccess: async () => {
      queryClient.setQueryData(queryKeys.postComments(postId), (prevData: any) => {
        return prevData.filter((comment: IComment) => comment._id !== commentId);
      });
    },
  });

  return { ...mutate };
};

export const useGetPostComments = (postId: string) => {
  const getPostComments = async () => {
    const res = await get(`/comments/post/${postId}`);
    return res.data;
  };
  const { data, isLoading, error } = useQuery<IComment[]>(queryKeys.postComments(postId), getPostComments);
  return { data, isLoading, error };
};

export const useDeletePost = (postId: string) => {
  const deleteComment = async () => {
    const res = await APIdelete(`/posts/${postId}`);
    return res.data;
  };
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteComment, {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKeys.newsfeedPosts);
      const previousData = queryClient.getQueryData(queryKeys.postComments(postId));

      queryClient.setQueriesData(queryKeys.newsfeedPosts, (previousData: any) => {
        return previousData.filter((post: IPost) => post._id !== postId);
      });

      return { previousData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKeys.newsfeedPosts, context?.previousData ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.newsfeedPosts);
    },
  });
  return mutation;
};
