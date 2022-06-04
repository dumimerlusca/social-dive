import React, { useCallback, useEffect, useRef } from 'react';
import { AiOutlineCheckCircle, AiOutlineClose } from 'react-icons/ai';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from 'store/selectors/uiSelectors';
import { removeNotification } from 'store/ui/uiSlice';
import classNames from 'classnames';

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

  return createPortal(
    <div
      className={classNames(
        'w-full max-w-sm fixed top-1/4 right-0 p-5 bg-[#2cf5eb] text-black z-[999] flex items-center rounded-xl h-20 gap-2 transition-transform duration-300',
        {
          'translate-x-0': notification,
          'translate-x-full': !notification,
        },
      )}
    >
      <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0'>
        {<AiOutlineCheckCircle className='w-6 h-6' />}
      </div>
      <p>{notification?.text}</p>
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
