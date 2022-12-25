import { useTranslate } from '@tolgee/react';
import classNames from 'classnames';
import { modalNames } from 'common/constansts';
import Button from 'components/Button/Button';
import AllFriendsModal from 'modules/users/Friends/AllFriendsModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentChat, getCurrentUserId } from 'store/selectors/appSelectors';
import { isDesktopDevice } from 'store/selectors/uiSelectors';
import { useAppSelector } from 'store/store';
import { openModalAction } from 'store/ui/uiSlice';
import ActiveChatPanel from './ActiveChatPanel';
import ChatList from './ChatList';
import { ActiveChatContextProvider } from './context/activeChatContext';
import SearchChat from './SearchChat';
import useFilteredChats from './useFilteredChats';

const ChatPanel = () => {
  const currentChat = useSelector(getCurrentChat);
  const { filteredChats, onChange, isLoading } = useFilteredChats();

  const isDesktop = useAppSelector(isDesktopDevice);
  const currentUserId = useSelector(getCurrentUserId);
  const dispatch = useDispatch();

  const t = useTranslate();

  return (
    <>
      <AllFriendsModal userId={currentUserId} />
      <ActiveChatContextProvider>
        <div className='container mt-[50px] lg:mt-[100px]'>
          <div className='block lg:grid grid-cols-12 gap-10 overflow-hidden'>
            {isDesktop && (
              <div className='col-span-4'>
                <h1 className='text-3xl font-bold text-center mb-5'>{t('panel.chat.title')}</h1>
                <SearchChat onChange={onChange} />
                <ChatList chats={filteredChats} isLoading={isLoading} />
                <Button
                  onClick={() => {
                    dispatch(openModalAction(modalNames.allFriends));
                  }}
                  color='secondary'
                  className='w-full mt-5'
                >
                  {t('panel.chat.speakToSomeoneNew')}
                </Button>
              </div>
            )}
            <div
              className={classNames({
                'col-span-8': isDesktop,
                'w-full': !isDesktop,
              })}
            >
              {currentChat ? (
                <ActiveChatPanel chat={currentChat} />
              ) : (
                <div className='h-full flex items-center justify-center'>
                  <h1 className='text-3xl'>{t('panel.chat.noActiveChat')}</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </ActiveChatContextProvider>
    </>
  );
};

export default ChatPanel;
