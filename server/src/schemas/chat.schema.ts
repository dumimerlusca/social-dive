import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { UserType } from "./user.schema";

export interface ChatType extends Chat, Document {}

@Schema({ timestamps: true })
class Chat {
	@Prop({
		type: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		],
		required: true,
	})
	users: UserType[];

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	initiatedBy: UserType | string;

	@Prop({ default: 0 })
	totalMessages: number;

	@Prop({ default: "" })
	lastMessage: string;

	@Prop()
	createdAt: number;

	@Prop()
	updatedAt: number;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
