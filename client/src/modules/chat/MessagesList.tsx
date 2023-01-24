import DotTyping from 'components/loadingSpinners/DotTyping';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useSocketContext from 'socket/socketContext';
import { getCurrentChat, getCurrentUserId } from 'store/selectors/appSelectors';
import ChatMessage from './ChatMessage';
import useActiveChatContext from './context/activeChatContext';

const MessagesLlst = () => {
  const { messages, isLoading, isTyping } = useActiveChatContext();
  const { socket } = useSocketContext();
  const currentUserId = useSelector(getCurrentUserId);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentActiveChat = useSelector(getCurrentChat);

  const otherUser = currentActiveChat?.users.find((user) => user._id !== currentUserId);

  const scrollToBottom = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, []);

  const onIsTyping = useCallback(
    (userId) => {
      if (userId !== otherUser?._id) return;
      scrollToBottom();
    },
    [otherUser?._id, scrollToBottom],
  );

  useEffect(() => {
    scrollToBottom();
  }, [currentActiveChat, scrollToBottom, messages]);

  useEffect(() => {
    socket.on('isTyping', onIsTyping);
    socket.on('privateMessage', onIsTyping);
    return () => {
      socket.removeListener('isTyping', onIsTyping);
      socket.removeListener('privateMessage', onIsTyping);
    };
  }, [onIsTyping, socket]);

  return (
    <div
      ref={containerRef}
      className='scroll-smooth h-screen max-h-[500px] overflow-auto py-5 px-3 flex flex-col gap-5'
    >
      {isLoading && (
        <div className='h-full w-full flex items-center justify-center'>
          <h2 className='text-xl'>Loading...</h2>
        </div>
      )}
      {messages.length === 0 && !isLoading && (
        <div className='h-full w-full flex items-center justify-center'>
          <h2 className='text-xl'>No messages</h2>
        </div>
      )}
      {messages.map((message) => {
        return (
          <ChatMessage
            key={message._id}
            message={message}
            sentByCurrentUser={message.user === currentUserId}
          />
        );
      })}
      {isTyping && (
        <div className='ml-2 p-3'>
          <DotTyping />
        </div>
      )}
    </div>
  );
};

export default MessagesLlst;
