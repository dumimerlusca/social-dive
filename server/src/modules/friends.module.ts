import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import FriendsController from "../controllers/friends.controller";
import FriendRequestSchema from "../schemas/friendRequest.chema";
import FriendshipSchema from "../schemas/friendship.schema";
import FriendsService from "../services/friends.service";
import { UsersModule } from "./users.module";

@Module({
	imports: [
		UsersModule,
		MongooseModule.forFeature([
			{ name: "FriendRequest", schema: FriendRequestSchema },
			{ name: "Friendship", schema: FriendshipSchema },
		]),
	],
	providers: [FriendsService],
	controllers: [FriendsController],
})
export default class FriendsModule {}
