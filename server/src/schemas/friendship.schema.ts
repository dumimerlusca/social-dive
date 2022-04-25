import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export interface FriendshipType extends Friendship, Document {}

@Schema({ timestamps: true })
class Friendship {
	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		required: true,
		validate: [
			(array: string[]) => array.length === 2,
			"Array length must be exactly 2 elements",
		],
	})
	users: string[];
}

const FriendshipSchema = SchemaFactory.createForClass(Friendship);

export default FriendshipSchema;
