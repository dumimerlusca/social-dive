import classNames from 'classnames';
import Button from 'components/Button/Button';
import useNotificationsContext from './context/notificationsContext';
import NotificationListItem from './NotificationListItem';

const NotificationsPanel = ({ wrapperClassName }: { wrapperClassName?: string }) => {
  const { notifications, changePageNumber, pageNumber, isLoading, hasMore, markSeenSuccess } =
    useNotificationsContext();

  return (
    <div
      className={classNames('p-5 rounded-3xl bg-primary', wrapperClassName)}
      style={{ minHeight: 200 }}
    >
      <h3 className='text-3xl mb-5'>Notification</h3>
      <ul className='flex flex-col gap-2'>
        {notifications.map((notification) => {
          return (
            <NotificationListItem
              markSeenSuccess={markSeenSuccess}
              key={notification._id}
              notification={notification}
            />
          );
        })}
      </ul>
      <Button
        tooltip={!hasMore ? 'No more notifications' : undefined}
        disabled={isLoading || !hasMore}
        onClick={() => {
          if (isLoading) return;
          changePageNumber(pageNumber + 1);
        }}
        color='secondary'
        className='w-full mt-5'
      >
        Load more
      </Button>
    </div>
  );
};

export default NotificationsPanel;
