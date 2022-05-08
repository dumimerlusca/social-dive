import React from 'react';
import { AiFillNotification } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useGetNotifications } from './apiClient';

const HeaderNotificationIcon = ({ iconClassName }: { iconClassName: string }) => {
  const { data: notifications = [] } = useGetNotifications();

  const unseen = notifications.filter((notification) => !notification.seen).length;

  return (
    <Link to='/notifications'>
      <div className='relative'>
        <div className='flex items-center justify-center rounded-full bg-red-800 h-4 w-4 absolute -top-2 -right-1'>
          <span className='text-xs'>{unseen}</span>
        </div>
        <AiFillNotification className={iconClassName} />
      </div>
    </Link>
  );
};

export default HeaderNotificationIcon;
