import { queryKeys } from 'common/constansts';
import { PaginatedData } from 'common/types';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { get, patch } from 'services/api';
import { NotificationType } from './types';

export const useGetNotifications = (pageNumber = 1) => {
  const getNotifications = useCallback(
    async (data) => {
      const res = await get(`/notifications?page=${pageNumber}`);
      return res.data;
    },
    [pageNumber],
  );

  return useQuery<PaginatedData<NotificationType> & { totalUnseen: number }>(
    [queryKeys.notifications, pageNumber],
    getNotifications,
  );
};

export const useMarkNotificationSeen = () => {
  const queryClient = useQueryClient();
  const markSeen = (notificationId: string) => patch(`/notifications/${notificationId}/markseen`);
  return useMutation(markSeen, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.notifications);
    },
  });
};
