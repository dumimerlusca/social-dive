import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	Req,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MessageType } from "../schemas/message.schema";
import { Model } from "mongoose";
import ChatService from "../services/chat.service";

@Controller("api/messages")
export default class MessagesController {
	constructor(
		@InjectModel("Message") private messageModel: Model<MessageType>,
		private chatService: ChatService
	) {}
	@Get()
	test() {
		console.log("test");
	}

	@Get("/chat/:chatId")
	async getAllChatMessages(@Param("chatId") chatId: string) {
		return await this.messageModel.find({ chatId });
	}

	@Post("/chat/:chatId")
	async sendMessage(
		@Param("chatId") chatId: string,
		@Req() req: any,
		@Body() body: any
	) {
		const senderId = req.user.id;
		const chat = await this.chatService.chatModel.findById(chatId);
		if (!chat) throw new HttpException("Chat not found", HttpStatus.NOT_FOUND);

		if (!chat.users.includes(senderId))
			throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

		const message = {
			user: senderId,
			text: body.message,
			chatId: chatId,
		};

		await chat.updateOne({
			lastMessage: message.text,
			$inc: { totalMessages: 1 },
		});

		return await this.messageModel.create(message);
	}

	@Patch("/:messageId")
	async editMessage() {}

	@Delete("/:messageId")
	async deleteMessage() {}
}
