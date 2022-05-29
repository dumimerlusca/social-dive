import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { AiFillNotification } from 'react-icons/ai';
import { useGetNotifications } from './apiClient';
import NotificationsDropdown from './NotificationsDropdown';

import './NotificationsDropdown.scss';

const HeaderNotificationIcon = ({ iconClassName }: { iconClassName: string }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { data: notificationsData } = useGetNotifications();

  const unseen = notificationsData
    ? notificationsData?.data.filter((notification) => !notification.seen).length
    : 0;

  return (
    <Tippy
      className='notifications-dropdown'
      theme='transparent'
      visible={isDropdownVisible}
      interactive
      placement='bottom-start'
      arrow={false}
      onClickOutside={(instace, e) => {
        setIsDropdownVisible(false);
      }}
      content={
        <NotificationsDropdown
          closeDropdown={() => {
            setIsDropdownVisible(false);
          }}
        />
      }
    >
      <div className='relative' onClick={() => setIsDropdownVisible((prev) => !prev)}>
        <div className='flex items-center justify-center rounded-full bg-red-800 h-4 w-4 absolute -top-2 -right-1'>
          <span className='text-xs'>{unseen}</span>
        </div>
        <AiFillNotification className={iconClassName} />
      </div>
    </Tippy>
  );
};

export default HeaderNotificationIcon;
