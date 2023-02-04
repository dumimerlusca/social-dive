import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCurrentChat } from 'store/chat/chatSlice';
import { getCurrentUserId } from 'store/selectors/appSelectors';
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

  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    if (isSuccess && chat) {
      dispatch(setCurrentChat(chat));
      navigate('/chat');
    }
  }, [chat, dispatch, isSuccess, navigate]);

  if (currentUserId === userId) return null;

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
