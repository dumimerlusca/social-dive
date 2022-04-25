import React from "react";
import ChatList from "./ChatList";
import ActiveChatPanel from "./ActiveChatPanel";
import SearchChat from "./SearchChat";
import Button from "components/Button/Button";
import { useSelector } from "react-redux";
import { getCurrentChat } from "store/selectors/appSelectors";
import { ActiveChatContextProvider } from "./context/activeChatContext";

const ChatPanel = () => {
	const currentChat = useSelector(getCurrentChat);
	return (
		<div className='container mt-[100px]'>
			<div className='grid grid-cols-12 gap-10'>
				<div className='col-span-4'>
					<h1 className='text-3xl font-bold text-center mb-5'>CHAT</h1>
					<SearchChat />
					<ChatList />
					<Button color='secondary' className='w-full mt-5'>
						Speak to Someone New!
					</Button>
				</div>
				<div className='col-span-8'>
					{currentChat ? (
						<ActiveChatContextProvider>
							<ActiveChatPanel chat={currentChat} />
						</ActiveChatContextProvider>
					) : (
						"No active chat"
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatPanel;
