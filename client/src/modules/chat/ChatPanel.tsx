import React from 'react';
import ChatList from './ChatList';
import ActiveChatPanel from './ActiveChatPanel';
import SearchChat from './SearchChat';
import Button from 'components/Button/Button';
import { useSelector } from 'react-redux';
import { getCurrentChat } from 'store/selectors/appSelectors';
import { ActiveChatContextProvider } from './context/activeChatContext';
import useFilteredChats from './useFilteredChats';
import { useAppSelector } from 'store/store';
import { isDesktopDevice } from 'store/selectors/uiSelectors';
import classNames from 'classnames';

const ChatPanel = () => {
  const currentChat = useSelector(getCurrentChat);
  const { filteredChats, onChange, isLoading } = useFilteredChats();

  const isDesktop = useAppSelector(isDesktopDevice);

  return (
    <ActiveChatContextProvider>
      <div className='container mt-[100px]'>
        <div className='grid grid-cols-12 gap-10'>
          {isDesktop && (
            <div className='col-span-4'>
              <h1 className='text-3xl font-bold text-center mb-5'>CHAT</h1>
              <SearchChat onChange={onChange} />
              <ChatList chats={filteredChats} isLoading={isLoading} />
              <Button color='secondary' className='w-full mt-5'>
                Speak to Someone New!
              </Button>
            </div>
          )}
          <div className={classNames({ 'col-span-8': isDesktop, 'col-span-12': !isDesktop })}>
            {currentChat ? (
              <ActiveChatPanel chat={currentChat} />
            ) : (
              <div className='h-full flex items-center justify-center'>
                <h1 className='text-3xl'>No active chat</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </ActiveChatContextProvider>
  );
};

export default ChatPanel;
