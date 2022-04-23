import { queryKeys } from "common/constansts";
import { ChatType, MessageType } from "common/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, post } from "services/api";

export const useGetChats = () => {
	const fetcher = async () => {
		const res = await get("/chat");
		return res.data;
	};
	return useQuery<ChatType[]>(queryKeys.chats, fetcher);
};

export const useGetChatMessages = (chatId: string) => {
	const fetcher = async () => {
		const res = await get(`/messages/chat/${chatId}`);
		return res.data;
	};
	return useQuery<MessageType[]>(queryKeys.chatMessages(chatId), fetcher);
};

export const useSendMessage = (chatId: string) => {
	const queryClient = useQueryClient();
	const sendMessage = (message: string) =>
		post(`/messages/chat/${chatId}`, { message });
	return useMutation(sendMessage, {
		onSettled: () => {
			queryClient.invalidateQueries(queryKeys.chatMessages(chatId));
			queryClient.invalidateQueries(queryKeys.chats);
		},
	});
};

export const useCreateChat = () => {
	const createChat: (userId: string) => Promise<ChatType> = async (
		userId: string
	) => {
		const res = await post(`/chat`, { userId });
		return res.data;
	};
	const queryClient = useQueryClient();
	return useMutation(createChat, {
		onSettled: () => {
			queryClient.invalidateQueries(queryKeys.chats);
		},
	});
};
