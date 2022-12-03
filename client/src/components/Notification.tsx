import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineCheckCircle, AiOutlineClose } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from 'store/selectors/uiSelectors';
import { removeNotification } from 'store/ui/uiSlice';

export enum NotificationTypesEnum {
  success = 'success',
  error = 'error',
}

export type UiNotificationType = {
  text: string;
  type: NotificationTypesEnum;
  autoDismiss: number;
};

const Notification = () => {
  const notification = useSelector(getNotification);

  const timeoutRef = useRef<any>(null);
  const dispatch = useDispatch();

  const removeNotificationHandler = useCallback(() => {
    dispatch(removeNotification());
  }, [dispatch]);

  useEffect(() => {
    if (!notification) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      removeNotificationHandler();
    }, notification.autoDismiss);
  }, [notification, removeNotificationHandler]);

  const icon = useMemo(() => {
    if (!notification) return;
    if (notification.type === NotificationTypesEnum.success)
      return <AiOutlineCheckCircle color='green' className='w-6 h-6' />;
    if (notification.type === NotificationTypesEnum.error)
      return <BiError color='red' className='w-6 h-6' />;
  }, [notification]);

  return createPortal(
    <div
      className={classNames(
        'w-full max-w-sm fixed top-1/4 right-0 p-5 z-[999] text-white flex items-center justify-between rounded-xl min-h-20 gap-2 transition-transform duration-300',
        {
          'translate-x-0': notification,
          'translate-x-full': !notification,
          'bg-red-600': notification?.type === NotificationTypesEnum.error,
          'bg-green-600': notification?.type === NotificationTypesEnum.success,
        },
      )}
    >
      <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0'>
        {icon}
      </div>
      <p className='overflow-hidden break-words grow ml-2'>{notification?.text}</p>
      <button
        className='ml-10'
        onClick={() => {
          removeNotificationHandler();
        }}
      >
        <AiOutlineClose />
      </button>
    </div>,
    document.getElementById('root')!,
  );
};

export default Notification;
