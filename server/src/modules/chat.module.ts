import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import ChatController from "../controllers/chat.controller";
import MessagesController from "../controllers/messages.controller";
import { ChatSchema } from "../schemas/chat.schema";
import { MessageSchema } from "../schemas/message.schema";
import ChatService from "../services/chat.service";
import { UsersModule } from "./users.module";

@Module({
	imports: [
		UsersModule,
		MongooseModule.forFeature([
			{ name: "Message", schema: MessageSchema },
			{ name: "Chat", schema: ChatSchema },
		]),
	],
	providers: [ChatService],
	exports: [MongooseModule, ChatService],
	controllers: [ChatController, MessagesController],
})
export default class ChatModule {}
