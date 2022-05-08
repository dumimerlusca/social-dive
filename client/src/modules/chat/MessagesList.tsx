import DotTyping from 'components/loadingSpinners/DotTyping';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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

  const scrollToBottom = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, []);

  const initialScrollToBottom = useCallback(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const scrollHeight = containerRef.current.scrollHeight;
    console.log(scrollTop, scrollHeight);
    containerRef.current.scrollTop = scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentActiveChat, scrollToBottom]);

  useEffect(() => {
    socket.on('isTyping', scrollToBottom);
    socket.on('privateMessage', scrollToBottom);
    return () => {
      socket.removeListener('isTyping', scrollToBottom);
      socket.removeListener('privateMessage', scrollToBottom);
    };
  }, [scrollToBottom, socket]);

  return (
    <div
      ref={containerRef}
      className='scroll-smooth h-screen max-h-[400px] overflow-auto py-5 px-3 flex flex-col gap-5'
    >
      {isLoading && 'Loading...'}
      {messages.map((message) => {
        return <ChatMessage key={message._id} message={message} sentByCurrentUser={message.user === currentUserId} />;
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
