import mongoose from "mongoose";
import { UserType } from "./user.schema";
export interface MessageType extends Document {
}
export declare class Message {
    user: UserType;
    chatId: string;
    text: string;
    createdAt: number;
    updatedAt: number;
}
export declare const MessageSchema: mongoose.Schema<mongoose.Document<Message, any, any>, mongoose.Model<mongoose.Document<Message, any, any>, any, any, any>, any, any>;
