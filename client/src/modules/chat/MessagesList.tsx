import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "store/selectors/appSelectors";
import ChatMessage from "./ChatMessage";
import useActiveChatContext from "./context/activeChatContext";

const MessagesLlst = () => {
	const { messages, isLoading } = useActiveChatContext();
	const currentUserId = useSelector(getCurrentUserId);
	return (
		<div className='h-screen max-h-[400px] overflow-auto py-5 px-3 flex flex-col gap-5'>
			{isLoading && "Loading..."}
			{messages.map(message => {
				return (
					<ChatMessage
						key={message._id}
						message={message}
						sentByCurrentUser={message.user === currentUserId}
					/>
				);
			})}
		</div>
	);
};

export default MessagesLlst;
