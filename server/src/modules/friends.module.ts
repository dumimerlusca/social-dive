import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import FriendsController from "../controllers/friends.controller";
import FriendRequestSchema from "../schemas/friendRequest.chema";
import FriendshipSchema from "../schemas/friendship.schema";
import FriendsService from "../services/friends.service";
import { UsersModule } from "./users.module";

@Module({
	imports: [
		forwardRef(() => UsersModule),
		MongooseModule.forFeature([
			{ name: "FriendRequest", schema: FriendRequestSchema },
			{ name: "Friendship", schema: FriendshipSchema },
		]),
	],
	providers: [FriendsService],
	controllers: [FriendsController],
	exports: [FriendsService],
})
export default class FriendsModule {}
