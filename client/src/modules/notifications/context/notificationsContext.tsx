import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import useSocketContext from 'socket/socketContext';
import { NotificationType } from '../types';
import usePaginatedNotifications from '../usePaginatedNotifications';

type NotificationsContextType = ReturnType<typeof usePaginatedNotifications>;

const NotificationsContext = createContext<NotificationsContextType>(
  {} as NotificationsContextType,
);

export const NotificationsContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const {
    notifications,
    changePageNumber,
    pageNumber,
    isLoading,
    hasMore,
    resetState,
    markSeenSuccess,
    addNotification,
  } = usePaginatedNotifications();

  const { socket } = useSocketContext();

  useEffect(() => {
    const onLikePostReceived = (notification: NotificationType) => {
      console.log('Like post received', notification);
      addNotification(notification);
    };
    socket.on('likePost', onLikePostReceived);
    return () => {
      socket.removeListener('likePost', onLikePostReceived);
    };
  }, [addNotification, socket]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        changePageNumber,
        pageNumber,
        isLoading,
        hasMore,
        resetState,
        markSeenSuccess,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotificationsContext = () => useContext(NotificationsContext);

export default useNotificationsContext;
