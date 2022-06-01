import Tippy from '@tippyjs/react';
import useLogout from 'common/hooks/useLogout';
import HeaderChatIcon from 'modules/chat/HeaderChatIcon';
import HeaderNotificationIcon from 'modules/notifications/HeaderNotificationIcon';
import React from 'react';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { FaBars, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from 'store/selectors/appSelectors';

const MobileNavigation = () => {
  return (
    <Tippy
      interactive={true}
      className='!bg-transparent'
      arrow={false}
      trigger='click'
      content={<DropdownContent />}
    >
      <button>
        <FaBars className='w-5 h-5' />
      </button>
    </Tippy>
  );
};

export default MobileNavigation;

const DropdownContent = () => {
  const currentUserId = useSelector(getCurrentUserId);
  const logoutHandler = useLogout();

  return (
    <div className='bg-[#1f2b2e] p-4 rounded-2xl'>
      <ul className='flex flex-col gap-2'>
        <li className='w-full px-2'>
          <Link to='/' className='flex gap-2'>
            <AiFillHome className='w-6 h-6' />
            <p>Home</p>
          </Link>
        </li>
        <li className='w-full px-2'>
          <HeaderNotificationIcon iconClassName='w-6 h-6' text='Notifications' />
        </li>
        <li className='w-full px-2'>
          <HeaderChatIcon text='Conversations' />
        </li>
        <li className='w-full px-2'>
          <Link className='flex gap-2' to={`/profile/${currentUserId}`}>
            <FaUser className='w-6 h-6' />
            <p>Profile</p>
          </Link>
        </li>
        <li className='w-full px-2'>
          <button onClick={logoutHandler} className='flex gap-2 items-center'>
            <AiOutlineLogout className='w-6 h-6' />
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </div>
  );
};
