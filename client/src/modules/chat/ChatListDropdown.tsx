import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router';
import ChatListItem from './ChatListItem';
import SearchChat from './SearchChat';
import useFilteredChats from './useFilteredChats';

const ChatListDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const { filteredChats, isLoading, onChange } = useFilteredChats();

  const navigate = useNavigate();

  return (
    <div>
      <SearchChat onChange={onChange} />
      <div className='overflow-auto max-h-96 px-2'>
        <ul className='flex flex-col gap-2'>
          {isLoading && <Skeleton count={3} className='h-16 rounded-2xl mb-2' />}
          {filteredChats.map((chat) => (
            <ChatListItem
              onClick={() => {
                navigate('/chat');
                closeDropdown();
              }}
              key={chat._id}
              chat={chat}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatListDropdown;
