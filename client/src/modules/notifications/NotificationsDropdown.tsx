import Button from 'components/Button/Button';
import useNotificationsContext from './context/notificationsContext';
import NotificationListItem from './NotificationListItem';

type NotificationsDropdownProps = {
  closeDropdown: () => void;
};

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ closeDropdown }) => {
  const { notifications, pageNumber, changePageNumber, isLoading, hasMore, markSeenSuccess } =
    useNotificationsContext();

  return (
    <div className='w-[300px] p-3'>
      <ul className='max-h-96 overflow-auto'>
        {notifications.map((notification) => (
          <NotificationListItem
            markSeenSuccess={markSeenSuccess}
            key={notification._id}
            onClickItem={closeDropdown}
            notification={notification}
          />
        ))}
      </ul>
      <Button
        tooltip={!hasMore ? 'No more notifications' : undefined}
        disabled={isLoading || !hasMore}
        className='w-full mt-4'
        onClick={() => changePageNumber(pageNumber + 1)}
      >
        Show More
      </Button>
    </div>
  );
};

export default NotificationsDropdown;
