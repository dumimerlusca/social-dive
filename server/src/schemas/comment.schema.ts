import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserType } from "./user.schema";

export type CommentType = Comment & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Comment {
	@Prop()
	id: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	user: UserType;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true })
	postId: mongoose.Schema.Types.ObjectId;

	@Prop({ required: true })
	text: string;

	@Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
	likes: UserType[];
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
