import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Injectable,
	Param,
	Patch,
	Post,
	Req,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FriendRequestType } from "../schemas/friendRequest.chema";
import { FriendshipType } from "../schemas/friendship.schema";
import FriendsService from "../services/friends.service";
import UsersService from "../services/users.service";

@Injectable()
@Controller("api/friends")
export default class FriendsController {
	constructor(
		@InjectModel("FriendRequest")
		readonly friendRequestModel: Model<FriendRequestType>,
		@InjectModel("Friendship") readonly friendshipModel: Model<FriendshipType>,
		readonly usersService: UsersService,
		readonly friendsService: FriendsService
	) {}
	// @Post("/test")
	// async test() {
	// 	return await this.friendshipModel.create({ users: 10 });
	// }

	@Get("/:userId")
	async getUserFriends(@Param("userId") userId: string) {
		const friendships = await this.friendshipModel.find({
			users: { $all: [userId] },
		});
		return friendships.map(
			friendship => friendship.users.filter(id => id !== userId)[0]
		);
	}

	@Get("/requests/me/sent")
	async getUserSentFriendRequest(@Req() req: any) {
		const userId = req.user.id;
		return await this.friendRequestModel.find({ from: userId });
	}
	@Get("/requests/me/received")
	async getUserReceivedFriendRequest(@Req() req: any) {
		const userId = req.user.id;
		return await this.friendRequestModel.find({ to: userId });
	}

	@Post("/requests/send")
	async sendFriendRequest(@Body() body: { to: string }, @Req() req: any) {
		const fromUserId = req.user.id;
		const toUserId = body.to;
		const sender = await this.usersService.userModel.findById(fromUserId);
		const receiver = await this.usersService.userModel.findById(toUserId);

		if (!receiver || !sender)
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);

		const requestAlreadyExists = await this.friendRequestModel.findOne({
			$or: [
				{
					from: fromUserId,
					to: toUserId,
				},
				{
					to: fromUserId,
					from: toUserId,
				},
			],
		});

		if (requestAlreadyExists)
			throw new HttpException("Request already sent", HttpStatus.BAD_REQUEST);

		const isAlreadyFriend = await this.friendshipModel.findOne({
			users: { $all: [fromUserId, toUserId] },
		});

		if (isAlreadyFriend)
			throw new HttpException(
				"This user is already in your friend list",
				HttpStatus.BAD_REQUEST
			);

		return await this.friendRequestModel.create({
			from: fromUserId,
			to: toUserId,
		});
	}

	@Delete("/requests/:friendRequestId")
	async deleteFriendRequest(
		@Param("friendRequestId") friendRequestId: string,
		@Req() req: any
	) {
		const userId = req.user.id;
		const friendRequest = await this.friendRequestModel.findById(
			friendRequestId
		);
		if (!friendRequest)
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);

		if (!this.friendsService.isPartOfFriendRequest(userId, friendRequest))
			throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

		await friendRequest.deleteOne();
		return "Request deleted success";
	}

	@Delete("/requests/:friendRequestId/accept")
	async acceptFriendRequest(
		@Param("friendRequestId") friendRequestId: string,
		@Req() req: any
	) {
		const userId = req.user.id;

		const friendRequest = await this.friendRequestModel.findById(
			friendRequestId
		);
		if (!friendRequest)
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);

		if (!this.friendsService.isFriedRequestRecepient(userId, friendRequest))
			throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

		friendRequest.remove();
		return await this.friendshipModel.create({
			users: [friendRequest.from, friendRequest.to],
		});
	}
}
