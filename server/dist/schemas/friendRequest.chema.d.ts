import mongoose, { Document } from "mongoose";
export interface FriendRequestType extends FriendRequest, Document {
}
declare class FriendRequest {
    from: string;
    to: string;
}
declare const FriendRequestSchema: mongoose.Schema<mongoose.Document<FriendRequest, any, any>, mongoose.Model<mongoose.Document<FriendRequest, any, any>, any, any, any>, any, any>;
export default FriendRequestSchema;
