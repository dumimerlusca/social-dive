import Button from 'components/Button/Button';
import { useEffect } from 'react';
import NotificationListItem from './NotificationListItem';
import { NotificationType } from './types';

type NotificationsDropdownProps = {
  notifications: NotificationType[];
  isLoading: boolean;
  changePageNumber: (pageNumber: number) => void;
  pageNumber: number;
  hasMore: boolean;
  closeDropdown: () => void;
};

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  closeDropdown,
  notifications,
  isLoading,
  changePageNumber,
  hasMore,
  pageNumber,
}) => {
  return (
    <div className='w-[300px]'>
      <ul className='max-h-96 overflow-auto'>
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
