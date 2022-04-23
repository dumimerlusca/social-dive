import mongoose from "mongoose";
import { UserType } from "./user.schema";
export declare type CommentType = Comment & Document;
export declare class Comment {
    id: string;
    user: UserType;
    postId: mongoose.Schema.Types.ObjectId;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    likes: UserType[];
}
export declare const CommentSchema: mongoose.Schema<mongoose.Document<Comment, any, any>, mongoose.Model<mongoose.Document<Comment, any, any>, any, any, any>, any, any>;
