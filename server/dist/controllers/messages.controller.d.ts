/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { MessageType } from "../schemas/message.schema";
import { Model } from "mongoose";
import ChatService from "../services/chat.service";
export default class MessagesController {
    private messageModel;
    private chatService;
    constructor(messageModel: Model<MessageType>, chatService: ChatService);
    test(): void;
    getAllChatMessages(chatId: string): Promise<(import("mongoose").Document<unknown, any, MessageType> & MessageType & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    sendMessage(chatId: string, req: any, body: any): Promise<import("mongoose").Document<unknown, any, MessageType> & MessageType & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editMessage(): Promise<void>;
    deleteMessage(): Promise<void>;
}
