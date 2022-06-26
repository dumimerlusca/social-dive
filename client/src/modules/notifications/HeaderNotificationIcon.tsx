import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { AiFillNotification } from 'react-icons/ai';
import { useGetNotifications } from './apiClient';
import NotificationsDropdown from './NotificationsDropdown';

import './NotificationsDropdown.scss';

const HeaderNotificationIcon = ({
  iconClassName,
  text,
}: {
  iconClassName?: string;
  text?: string;
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { data: notificationsData } = useGetNotifications();

  const totalUnseen = notificationsData?.totalUnseen ?? 0;

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
      <div className='flex gap-2' onClick={() => setIsDropdownVisible((prev) => !prev)}>
        <div className='relative'>
          <div className='flex items-center justify-center rounded-full bg-red-800 h-4 w-4 absolute -top-2 -right-1'>
            <span className='text-xs'>{totalUnseen}</span>
          </div>
          <AiFillNotification className={iconClassName} />
        </div>
        {text && <p>{text}</p>}
      </div>
    </Tippy>
  );
};

export default HeaderNotificationIcon;
