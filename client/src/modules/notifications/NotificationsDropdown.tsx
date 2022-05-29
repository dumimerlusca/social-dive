import Button from 'components/Button/Button';
import NotificationListItem from './NotificationListItem';
import usePaginatedNotifications from './usePaginatedNotifications';

const NotificationsDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const { notifications, isLoading, changePageNumber, pageNumber, hasMore } =
    usePaginatedNotifications();

  return (
    <div className=''>
      <ul className='max-h-96 overflow-auto max-w-xs'>
        {notifications.map((notification) => (
          <NotificationListItem
            key={notification._id}
            onClickItem={closeDropdown}
            notification={notification}
          />
        ))}
      </ul>
      <Button
        disabled={isLoading || !hasMore}
        className='w-full'
        onClick={() => changePageNumber(pageNumber + 1)}
      >
        Show More
      </Button>
    </div>
  );
};

export default NotificationsDropdown;
