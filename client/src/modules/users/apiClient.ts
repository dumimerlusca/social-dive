import { queryKeys } from 'common/constansts';
import useAsyncFunction from 'common/hooks/useAsyncFunction';
import useFetchData from 'common/hooks/useFetchData';
import { FriendRequestType } from 'common/types';
import IUser from 'interfaces/IUser';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { APIdelete, get, post, put } from 'services/api';
import usersService from 'services/users.service';
import { getCurrentUserId } from 'store/selectors/appSelectors';

export const useGetPeopleYouMightKnow = () => {
  return useQuery<IUser[]>(queryKeys.peopleYouMightKnow, usersService.getPeopleYouMightKnow);
};

export const useGetUser = (userId: string) => {
  const getUser = async () => {
    const res = await get(`/users/${userId}`);
    return res.data;
  };
  const { data, isLoading, error } = useQuery<IUser>(queryKeys.user(userId), getUser);
  return { data, isLoading, error };
};

export const useUpdateUser = () => {
  const currentUserId = useSelector(getCurrentUserId);
  const updateUser = useCallback(
    async (data: any) => {
      return await put(`/users/${currentUserId}`, data);
    },
    [currentUserId],
  );
  return useAsyncFunction(updateUser);
};

export const useGetUserFriends = (userId: string) => {
  return useFetchData<IUser[]>(queryKeys.friends(userId), `/friends/${userId}`);
};

export const useGetSentFriendRequests = () => {
  return useFetchData<FriendRequestType[]>(
    queryKeys.sentFriendRequest,
    '/friends/requests/me/sent',
  );
};

export const useGetReceivedFriendRequest = () => {
  return useFetchData<FriendRequestType[]>(
    queryKeys.receivedFriendRequest,
    '/friends/requests/me/received',
  );
};
export const useSendFriendRequestV2 = () => {
  const queryClient = useQueryClient();
  const sendFriendRequest = useCallback(async (to: string) => {
    const res = await post('/friends/requests/send', { to });
    return res.data;
  }, []);
  return useMutation(sendFriendRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.sentFriendRequest);
    },
  });
};

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  const currentUserId = useSelector(getCurrentUserId);
  const deleteFriend = useCallback((userId) => APIdelete(`/friends/delete/${userId}`), []);
  return useMutation(deleteFriend, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.friends(currentUserId));
    },
  });
};

export const useDeleteFriendRequest = () => {
  const queryClient = useQueryClient();
  const deleteFriendRequest = useCallback(
    async (friendRequestId) => APIdelete(`/friends/requests/${friendRequestId}`),
    [],
  );
  return useMutation(deleteFriendRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.sentFriendRequest);
      queryClient.invalidateQueries(queryKeys.receivedFriendRequest);
    },
  });
};

export const useAcceptFriendRequest = () => {
  const currentUserId = useSelector(getCurrentUserId);
  const queryClient = useQueryClient();
  const acceptFriendRequest = useCallback(
    async (friendRequestId) => APIdelete(`/friends/requests/${friendRequestId}/accept`),
    [],
  );
  return useMutation(acceptFriendRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.sentFriendRequest);
      queryClient.invalidateQueries(queryKeys.receivedFriendRequest);
      queryClient.invalidateQueries(queryKeys.friends(currentUserId));
      queryClient.invalidateQueries(queryKeys.peopleYouMightKnow);
    },
  });
};
