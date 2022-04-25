import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Injectable,
	Param,
	Patch,
	Post,
	Req,
} from "@nestjs/common";

import ChatService, { populateOptions } from "../services/chat.service";

@Controller("api/chat")
@Injectable()
export default class ChatController {
	constructor(private chatService: ChatService) {}

	@Post()
	async createChat(@Body() body: any, @Req() req: any) {
		const senderId = req.user.id;
		const receiverId = body.userId;
		if (!receiverId)
			throw new HttpException(
				"Bad request, no userID found in the body",
				HttpStatus.BAD_REQUEST
			);
		if (senderId === receiverId)
			throw new HttpException(
				"You can't send messages to yourself",
				HttpStatus.BAD_REQUEST
			);

		const existingConversation =
			await this.chatService.checkExistingConversation(senderId, receiverId);
		if (existingConversation)
			return existingConversation.populate(populateOptions);

		const chat = {
			users: [senderId, receiverId],
			initiatedBy: senderId,
		};

		const newChat = await this.chatService.chatModel.create(chat);
		return await newChat.populate(populateOptions);
	}

	@Get()
	async getAllChatsOfCurrentUser(@Req() req: any) {
		const userId = req.user.id;
		const chats = await this.chatService.chatModel
			.find({ users: userId })
			.sort({ updatedAt: -1 })
			.populate(populateOptions);

		return chats.filter(chat => {
			if (
				chat.totalMessages === 0 &&
				String(chat.initiatedBy) !== String(userId)
			)
				return null;
			return chat;
		});
	}
}
