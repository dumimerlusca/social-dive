import mongoose from "mongoose";
export interface FriendshipType extends Friendship, Document {
}
declare class Friendship {
    users: string[];
}
declare const FriendshipSchema: mongoose.Schema<mongoose.Document<Friendship, any, any>, mongoose.Model<mongoose.Document<Friendship, any, any>, any, any, any>, any, any>;
export default FriendshipSchema;
