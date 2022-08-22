import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetNotifications } from './apiClient';
import { NotificationType } from './types';

const usePaginatedNotifications = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [totalUnseen, setTotalUnseen] = useState<number>(0);
  const { data: notificationsData, isLoading } = useGetNotifications(pageNumber);

  useEffect(() => {
    if (!notificationsData) return;
    setTotalUnseen(notificationsData.totalUnseen);
  }, [notificationsData]);

  const hasMore = useMemo(() => {
    if (!notificationsData) return;
    const { total, limit, page } = notificationsData;
    return total - limit * page > 0;
  }, [notificationsData]);

  useEffect(() => {
    if (!notificationsData) return;
    const newNotifications = notificationsData.data.filter((notification) => {
      const isAlready = notifications.find((item) => item._id === notification._id);
      if (isAlready) return null;
      return notification;
    });

    if (newNotifications.length === 0) return;
    setNotifications((prev) =>
      [...prev, ...newNotifications]
        .filter((notification) => !notification.fromSocket)
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
    );
  }, [notifications, notificationsData]);

  const changePageNumber = useCallback((pageNumber: number) => {
    setPageNumber(pageNumber);
  }, []);

  const resetState = useCallback(() => {
    setPageNumber(1);
    setNotifications([]);
  }, []);

  const markSeenSuccess = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification._id !== notificationId) return notification;
        return { ...notification, seen: true };
      }),
    );
    setTotalUnseen((prev) => prev - 1);
  }, []);

  const addNotification = useCallback((notification: NotificationType) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  return {
    notifications,
    isLoading,
    pageNumber,
    changePageNumber,
    hasMore,
    resetState,
    markSeenSuccess,
    addNotification,
    totalUnseen,
  };
};

export default usePaginatedNotifications;
