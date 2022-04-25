import DotTyping from "components/loadingSpinners/DotTyping";
import { useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "store/selectors/appSelectors";
import ChatMessage from "./ChatMessage";
import useActiveChatContext from "./context/activeChatContext";

const MessagesList = () => {
	const { messages, isLoading, isTyping } = useActiveChatContext();
	const currentUserId = useSelector(getCurrentUserId);
	const containerRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = useCallback(() => {
		if (!containerRef.current) return;
		containerRef.current.scrollTop = containerRef.current?.scrollHeight;
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages, isTyping, scrollToBottom]);

	return (
		<div
			ref={containerRef}
			className='h-screen max-h-[400px] overflow-auto py-5 px-3 flex flex-col gap-5'
		>
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
			{isTyping && (
				<div className='flex ml-5'>
					<DotTyping />
				</div>
			)}
		</div>
	);
};

export default MessagesList;
