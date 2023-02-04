import { useTranslate } from '@tolgee/react';
import { useEffect, useRef } from 'react';
import useAddNotification from './useAddNotification';

const useApiLoadingTime = ({
  isLoading,
  isSucceeded,
  message,
  erorr,
  notificationDismissTime = 15000,
}: {
  isLoading: boolean;
  isSucceeded: boolean;
  message?: string;
  erorr: any;
  notificationDismissTime?: number;
}) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const translate = useTranslate();

  const { showInfoNotification } = useAddNotification();
  useEffect(() => {
    if (timer.current) return;
    if (isLoading) {
      timer.current = setTimeout(() => {
        showInfoNotification(
          message ?? translate('notifications.bigLoadingTimeOnFirstLogin'),
          notificationDismissTime,
        );
      }, 3000);
    }
  }, [isLoading, message, notificationDismissTime, showInfoNotification, translate]);

  useEffect(() => {
    if (isSucceeded && timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [isSucceeded]);

  useEffect(() => {
    if (erorr && timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [erorr]);

  return {};
};

export default useApiLoadingTime;
