import classNames from "classnames";
import { MessageType } from "common/types";
import { formatDate } from "helpers/helpers";
import React from "react";

type ChatMessageProps = {
	sentByCurrentUser: boolean;
	message: MessageType;
};

const ChatMessage = ({ sentByCurrentUser, message }: ChatMessageProps) => {
	return (
		<div
			className={classNames("flex gap-3 items-center max-w-[70%]", {
				"ml-auto  flex-row-reverse": sentByCurrentUser,
			})}
		>
			<p
				className={classNames("  p-5 rounded-3xl", {
					"bg-[#B5E7ED] text-black": sentByCurrentUser,
					"bg-[#117A87]": !sentByCurrentUser,
				})}
			>
				{message.text}
			</p>
			<p>{formatDate(new Date(message.createdAt))}</p>
		</div>
	);
};

export default ChatMessage;
