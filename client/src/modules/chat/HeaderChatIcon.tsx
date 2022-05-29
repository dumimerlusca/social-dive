import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { isDesktopDevice } from 'store/selectors/uiSelectors';
import { useAppSelector } from 'store/store';
import ChatListDropdown from './ChatListDropdown';

import './ChatListDropdown.scss';
import { ActiveChatContextProvider } from './context/activeChatContext';

const HeaderChatIcon = () => {
  const isDesktop = useAppSelector(isDesktopDevice);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  if (isDesktop)
    return (
      <Link to='/chat'>
        <AiFillMessage className='w-6 h-6' />
      </Link>
    );

  return (
    <ActiveChatContextProvider>
      <Tippy
        visible={isDropdownVisible}
        className='chat-list-dropdown'
        interactive
        arrow={false}
        onClickOutside={() => {
          setIsDropdownVisible(false);
        }}
        content={<ChatListDropdown closeDropdown={() => setIsDropdownVisible(false)} />}
      >
        <div
          onClick={() => {
            setIsDropdownVisible((prev) => !prev);
          }}
        >
          <AiFillMessage className='w-6 h-6' />
        </div>
      </Tippy>
    </ActiveChatContextProvider>
  );
};

export default HeaderChatIcon;
