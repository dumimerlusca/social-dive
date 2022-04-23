import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserType } from "./user.schema";

export interface MessageType extends Document {}

@Schema({ timestamps: true })
export class Message {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	user: UserType;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	chatId: string;

	@Prop({ required: true })
	text: string;

	@Prop()
	createdAt: number;

	@Prop()
	updatedAt: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
