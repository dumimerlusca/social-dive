import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "store/chat/chatSlice";
import { getCurrentChat } from "store/selectors/appSelectors";
import { useGetChats } from "./apiClient";
import ChatListItem from "./ChatListItem";

const ChatList: React.FC = () => {
	const { data: chats = [] } = useGetChats();
	const dispatch = useDispatch();
	const currentChat = useSelector(getCurrentChat);
	useEffect(() => {
		// Update the current chat wenever the chat list changes
		dispatch(setCurrentChat(chats.find(chat => chat._id === currentChat?._id)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chats]);

	return (
		<ul className='flex flex-col gap-3'>
			{chats.map(chat => {
				return <ChatListItem chat={chat} />;
			})}
		</ul>
	);
};

export default ChatList;
