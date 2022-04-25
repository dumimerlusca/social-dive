import classNames from "classnames";
import { ChatType } from "common/types";
import { formatDate } from "helpers/helpers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userImageUrl } from "services/api";
import { setCurrentChat } from "store/chat/chatSlice";
import { getCurrentChat, getCurrentUserId } from "store/selectors/appSelectors";

const ChatListItem = ({ chat }: { chat: ChatType }) => {
	const currentUserId = useSelector(getCurrentUserId);
	const user = getOtherUser(chat, currentUserId);
	const currentChat = useSelector(getCurrentChat);

	const dispatch = useDispatch();

	const isActive = chat._id === currentChat?._id;

	return (
		<li
			onClick={() => {
				dispatch(setCurrentChat(chat));
			}}
			className={classNames(
				"flex items-center gap-5 rounded-3xl p-5 bg-primary hover:bg-gray-700 transition-colors duration-500",
				{ "bg-gray-700": isActive }
			)}
		>
			<div className='w-16 h-16 rounded-full overflow-hidden'>
				<img
					className='w-full h-full object-cover'
					src={userImageUrl(user?._id)}
					alt=''
				/>
			</div>
			<div className='flex items-center gap-4'>
				<div>
					<h3 className='text-2xl font-bold'>{user?.fullName}</h3>
					<p className='truncate font-light'>{chat.lastMessage}</p>
				</div>
				{user?.isActive ? (
					<div className='rounded-full w-5 h-5 bg-yellow-200'></div>
				) : (
					<p>{formatDate(new Date(user?.lastActive!))} </p>
				)}
			</div>
			<p className='font-bold ml-auto'>
				{formatDate(new Date(chat.updatedAt))}
			</p>
		</li>
	);
};

export default ChatListItem;

export function getOtherUser(
	chat: ChatType,
	currentUserId: string | undefined
) {
	if (!currentUserId) return;
	return chat.users.find(user => user._id !== currentUserId);
}
