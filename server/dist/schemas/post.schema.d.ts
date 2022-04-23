import mongoose, { Document } from "mongoose";
import { UserType } from "./user.schema";
import { PhotoType } from "./user.schema";
export declare type PostType = Post & Document;
export declare class Post {
    description: string;
    photo: PhotoType;
    user: UserType;
    likes: UserType[];
    shares: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PostSchema: mongoose.Schema<mongoose.Document<Post, any, any>, mongoose.Model<mongoose.Document<Post, any, any>, any, any, any>, any, any>;
