/// <reference types="node" />
import mongoose, { Document } from "mongoose";
export declare type UserType = User & Document;
export declare class PhotoType {
    data: Buffer;
    contentType: string;
}
export declare class User {
    fullName: string;
    email: string;
    password: string;
    photo: PhotoType;
    friends: UserType[];
    friendRequestsSent: UserType[];
    friendRequestsReceived: UserType[];
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<mongoose.Document<User, any, any>, any, any, any>, any, any>;
