import { ChatType } from 'common/types';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from 'store/chat/chatSlice';
import { getCurrentChat } from 'store/selectors/appSelectors';
import ChatListItem from './ChatListItem';

const ChatList: React.FC<{ chats: ChatType[]; isLoading: boolean }> = ({ chats, isLoading }) => {
  const dispatch = useDispatch();
  const currentChat = useSelector(getCurrentChat);
  useEffect(() => {
    // Update the current chat whenever the chat list changes
    const updatedChat = chats.find((chat) => chat._id === currentChat?._id);
    if (!updatedChat) return;
    dispatch(setCurrentChat(updatedChat));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  return (
    <div className='max-h-[400px] overflow-auto px-2'>
      <ul className='flex flex-col gap-3'>
        {isLoading && <Skeleton count={3} className='h-24 rounded-3xl mb-2' />}
        {chats.length === 0 && !isLoading && (
          <p className='my-10'>You don't have any conversations</p>
        )}
        {chats.map((chat) => {
          return <ChatListItem key={chat._id} chat={chat} />;
        })}
      </ul>
    </div>
  );
};

export default ChatList;
