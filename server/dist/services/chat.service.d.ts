import { ChatType } from "../schemas/chat.schema";
import { Model, PopulateOptions } from "mongoose";
import { MessageType } from "../schemas/message.schema";
export declare const populateOptions: PopulateOptions[];
export default class ChatService {
    chatModel: Model<ChatType>;
    messageModel: Model<MessageType>;
    constructor(chatModel: Model<ChatType>, messageModel: Model<MessageType>);
    checkExistingConversation(user1Id: string, user2Id: string): Promise<ChatType & {
        _id: any;
    }>;
}
