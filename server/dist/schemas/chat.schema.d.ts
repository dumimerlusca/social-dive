import mongoose, { Document } from "mongoose";
import { UserType } from "./user.schema";
export interface ChatType extends Chat, Document {
}
declare class Chat {
    users: UserType[];
    initiatedBy: UserType | string;
    totalMessages: number;
    lastMessage: string;
    createdAt: number;
    updatedAt: number;
}
export declare const ChatSchema: mongoose.Schema<mongoose.Document<Chat, any, any>, mongoose.Model<mongoose.Document<Chat, any, any>, any, any, any>, any, any>;
export {};
