import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export interface FriendRequestType extends FriendRequest, Document {}

@Schema({ timestamps: true })
class FriendRequest {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	from: string;
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	to: string;
}

const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);

export default FriendRequestSchema;
