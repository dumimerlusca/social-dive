import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetNotifications } from './apiClient';
import { NotificationType } from './types';

const usePaginatedNotifications = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { data: notificationsData, isLoading } = useGetNotifications(pageNumber);

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
    setNotifications((prev) => [...prev, ...newNotifications]);
  }, [notifications, notificationsData]);

  const changePageNumber = useCallback((pageNumber: number) => {
    setPageNumber(pageNumber);
  }, []);

  return { notifications, isLoading, pageNumber, changePageNumber, hasMore };
};

export default usePaginatedNotifications;
