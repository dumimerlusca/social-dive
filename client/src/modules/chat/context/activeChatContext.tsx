import { MessageType } from 'common/types';
import {
  ChangeEvent,
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import useSocketContext from 'socket/socketContext';
import { getCurrentChat, getCurrentUserId } from 'store/selectors/appSelectors';
import { useGetChatMessages, useSendMessage } from '../apiClient';

type ActiveChatContextType = {
  messages: MessageType[];
  inputValue: string;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  isTyping: boolean;
  resetMessages: () => void;
};

const activeChatContext = createContext<ActiveChatContextType>({} as ActiveChatContextType);

const ActiveChatContextProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef<any>(null);

  const currentActiveChat = useSelector(getCurrentChat);

  const { data: messagesData = [], isLoading } = useGetChatMessages(
    currentActiveChat ? currentActiveChat._id : null,
  );
  const { mutate: sendMessage } = useSendMessage(currentActiveChat?._id!);
  const { socket } = useSocketContext();
  const currentUserId = useSelector(getCurrentUserId);
  const otherUser = currentActiveChat?.users.find((user) => user._id !== currentUserId);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newMessage = {
      user: currentUserId,
      _id: String(Math.random()),
      chatId: currentActiveChat?._id as string,
      createdAt: new Date(Date.now()).toISOString(),
      updatedAt: new Date(Date.now()).toISOString(),
      text: inputValue,
    };
    socket.emit('privateMessage', {
      content: newMessage,
      to: otherUser?._id,
    });
    setInputValue('');
    setMessages((prev) => [...prev, newMessage]);
    sendMessage(inputValue);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    socket.emit('isTyping', { to: otherUser?._id, from: currentUserId });
  };

  useEffect(() => {
    if (messagesData.length === 0) return;
    setMessages(messagesData);
  }, [messagesData]);

  useEffect(() => {
    const onPrivateMessage = (message: MessageType) => {
      setMessages((prev) => [...prev, message]);
    };
    socket.on('privateMessage', onPrivateMessage);
    return () => {
      socket.removeListener('privateMessage', onPrivateMessage);
    };
  }, [socket]);

  useEffect(() => {
    const isTyping = (from: string) => {
      if (from !== otherUser?._id) return;
      clearTimeout(typingTimeout.current);
      setIsTyping(true);
      typingTimeout.current = setTimeout(() => {
        setIsTyping(false);
      }, 700);
    };
    socket.on('isTyping', isTyping);
    return () => {
      socket.removeListener('isTyping', isTyping);
    };
  }, [otherUser?._id, socket]);

  const resetMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <activeChatContext.Provider
      value={{ messages, onSubmit, inputValue, isLoading, onChange, isTyping, resetMessages }}
    >
      {children}
    </activeChatContext.Provider>
  );
};

const useActiveChatContext = () => useContext(activeChatContext);
export { ActiveChatContextProvider };
export default useActiveChatContext;
