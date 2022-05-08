import { queryKeys } from 'common/constansts';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { get, patch } from 'services/api';
import { NotificationType } from './types';

export const useGetNotifications = () => {
  const getNotifications = useCallback(async () => {
    const res = await get('/notifications');
    return res.data;
  }, []);

  return useQuery<NotificationType[]>(queryKeys.notifications, getNotifications);
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
