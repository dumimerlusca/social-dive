import classNames from 'classnames';
import Button from 'components/Button/Button';
import React from 'react';
import { useGetNotifications } from './apiClient';
import NotificationListItem from './NotificationListItem';

const NotificationsPanel = ({ wrapperClassName }: { wrapperClassName?: string }) => {
  const { data: notifications = [] } = useGetNotifications();

  return (
    <div className={classNames('p-5 rounded-3xl bg-primary', wrapperClassName)} style={{ minHeight: 200 }}>
      <h3 className='text-3xl mb-5'>Notification</h3>
      <ul className='flex flex-col gap-2'>
        {notifications.map((notification) => {
          return <NotificationListItem notification={notification} />;
        })}
      </ul>
      <Button color='secondary' className='w-full mt-5'>
        Show all notifications
      </Button>
    </div>
  );
};

export default NotificationsPanel;
