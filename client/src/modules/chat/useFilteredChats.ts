import { ChatType } from 'common/types';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from 'store/selectors/appSelectors';
import { useGetChats } from './apiClient';
import { getOtherUser } from './ChatListItem';

const useFilteredChats = () => {
  const [filteredChats, setFilteredChats] = useState<ChatType[]>([]);
  const [queryValue, setQueryValue] = useState('');

  const currentUserId = useSelector(getCurrentUserId);

  const { data: chats = [], isLoading } = useGetChats();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value.toLowerCase());
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const filteredChatsTemp = chats.filter((chat) => {
      const user = getOtherUser(chat, currentUserId);
      if (!user) return null;
      const { fullName } = user;
      if (fullName.toLowerCase().includes(queryValue)) return chat;
      if (chat.lastMessage?.toLowerCase().includes(queryValue)) return chat;
      return null;
    });
    setFilteredChats(filteredChatsTemp);
  }, [chats, currentUserId, isLoading, queryValue]);

  return { onChange, filteredChats, isLoading };
};

export default useFilteredChats;
