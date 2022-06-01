import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { AiFillNotification } from 'react-icons/ai';
import { useGetNotifications } from './apiClient';
import NotificationsDropdown from './NotificationsDropdown';

import './NotificationsDropdown.scss';
import usePaginatedNotifications from './usePaginatedNotifications';

const HeaderNotificationIcon = ({ iconClassName }: { iconClassName: string }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { data: notificationsData } = useGetNotifications();
  const { notifications, isLoading, changePageNumber, pageNumber, hasMore, resetState } =
    usePaginatedNotifications();

  const totalUnseen = notificationsData?.totalUnseen ?? 0;

  return (
    <Tippy
      className='notifications-dropdown'
      theme='transparent'
      visible={isDropdownVisible}
      interactive
      placement='bottom-start'
      arrow={false}
      onHide={() => {
        setTimeout(() => {
          resetState();
        }, 500);
      }}
      onClickOutside={(instace, e) => {
        setIsDropdownVisible(false);
      }}
      content={
        <NotificationsDropdown
          notifications={notifications}
          isLoading={isLoading}
          changePageNumber={changePageNumber}
          pageNumber={pageNumber}
          hasMore={!!hasMore}
          closeDropdown={() => {
            setIsDropdownVisible(false);
          }}
        />
      }
    >
      <div className='relative' onClick={() => setIsDropdownVisible((prev) => !prev)}>
        <div className='flex items-center justify-center rounded-full bg-red-800 h-4 w-4 absolute -top-2 -right-1'>
          <span className='text-xs'>{totalUnseen}</span>
        </div>
        <AiFillNotification className={iconClassName} />
      </div>
    </Tippy>
  );
};

export default HeaderNotificationIcon;
