import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCurrentChat } from 'store/chat/chatSlice';
import { useCreateChat } from './apiClient';

const SendMessageButton = ({
  userId,
  className,
  content,
}: {
  userId: string;
  className?: string;
  content?: React.ReactNode;
}) => {
  const { mutate: createChat, isSuccess, data: chat } = useCreateChat();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && chat) {
      dispatch(setCurrentChat(chat));
      navigate('/chat');
    }
  }, [chat, dispatch, isSuccess, navigate]);

  return (
    <button
      className={className}
      onClick={() => {
        createChat(userId!);
      }}
    >
      {content ?? 'Send message'}
    </button>
  );
};

export default SendMessageButton;
