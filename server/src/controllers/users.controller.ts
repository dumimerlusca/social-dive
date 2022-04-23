import {
	Controller,
	Get,
	Post,
	Body,
	Injectable,
	Delete,
	Param,
	HttpException,
	Put,
	Req,
	HttpStatus,
	Res,
	Query,
	Patch,
	UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import UsersService, {
	populateOptions,
	userSelectOptions,
} from "../services/users.service";
import { IncomingForm } from "formidable";
import * as fs from "fs";
import { UserType } from "../schemas/user.schema";
import * as path from "path";
import { AuthGuard } from "../guards/auth.guard";
import { Public } from "../decorators/decorators";

@Controller("api/users")
@Injectable()
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	@Public()
	@UseGuards(AuthGuard)
	async getAll(@Req() req: any) {
		return await this.usersService.userModel.find({}).select(userSelectOptions);
	}

	@Get(":id")
	async getSingle(@Param("id") id: string) {
		const user = await this.usersService.userModel
			.findById(id)
			.select(userSelectOptions)
			.populate(populateOptions);
		if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		return user;
	}

	@Delete(":id")
	async delete(@Param("id") id: string) {
		await this.usersService.delete(id);
		return `User with id ${id} was deleted successfully`;
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() body: Object) {
		return await this.usersService.update(id, body);
	}

	@Put(":id/upload")
	async upload(
		@Param("id") id: string,
		@Req() req: Request,
		@Res() res: Response
	) {
		const form = new IncomingForm();
		form.parse(req, async (error: any, field: any, files: any) => {
			if (error) {
				throw new HttpException(
					"Server error",
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			}

			let user: UserType;
			if (files?.photo) {
				user = await this.usersService.update(id, {
					photo: {
						data: fs.readFileSync(files.photo.filepath),
						contentType: files.photo.mimetype,
					},
				});
				if (!user)
					return res.status(HttpStatus.NOT_FOUND).send("User not found");
			}

			return res.status(200).json(user);
		});
	}

	@Get(":id/photo")
	@Public()
	async getPhoto(
		@Param("id") id: string,
		@Req() req: Request,
		@Res() res: Response
	) {
		const user = await this.usersService.findById(id);

		if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		if (user?.photo) {
			res.set("Content-Type", user.photo.contentType);
			return res.send(user.photo.data);
		}
		res.sendFile("defaultProfilePhoto.png", {
			root: path.join(__dirname, "../../public"),
		});
	}

	@Patch(":id/sendFriendRequest")
	async sendFriendRequest(@Req() req: any, @Param("id") receiverId: any) {
		const senderId = req.user.id;

		const sender = await this.usersService.userModel.findById(senderId);
		const receiver = await this.usersService.userModel.findById(receiverId);

		if (!receiver || !sender)
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);

		if (
			sender.friendRequestsSent.includes(receiverId) ||
			sender.friendRequestsReceived.includes(senderId)
		)
			throw new HttpException("Request already sent", HttpStatus.BAD_REQUEST);
		if (sender.friends.includes(receiverId))
			throw new HttpException(
				"This user is already in your friend list",
				HttpStatus.BAD_REQUEST
			);

		await sender.updateOne(
			{ $push: { friendRequestsSent: receiverId } },
			{ new: true }
		);
		await receiver.updateOne(
			{ $push: { friendRequestsReceived: senderId } },
			{ new: true }
		);

		return await this.usersService.userModel
			.findById(senderId)
			.select(userSelectOptions)
			.populate(populateOptions);
	}

	// :id/respondToFriendRequest?action={'accept' | 'decline'}
	@Patch(":id/respondToFriendRequest")
	async respondToFriendRequest(
		@Query("action") action: "accept" | "decline",
		@Param("id") senderId: string,
		@Req() req: any
	) {
		if (action !== "accept" && action !== "decline")
			return "Action not valid, must be 'accept' or 'decline'";

		const receiverId = req.user.id;

		const sender = await this.usersService.userModel.findById(senderId);
		const receiver = await this.usersService.userModel.findById(receiverId);

		if (!receiver || !sender)
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);

		if (
			!sender.friendRequestsSent.includes(receiverId) ||
			!receiver.friendRequestsReceived.includes(senderId as any)
		)
			throw new HttpException(
				"No friend request found",
				HttpStatus.BAD_REQUEST
			);

		if (action === "accept") {
			await sender.updateOne({
				$pull: { friendRequestsSent: receiverId },
				$push: { friends: receiverId },
			});

			await receiver.updateOne({
				$pull: { friendRequestsReceived: senderId },
				$push: { friends: senderId },
			});
			return await this.usersService.userModel
				.findById(receiverId)
				.select(userSelectOptions)
				.populate(populateOptions);
		}

		if (action === "decline") {
			await sender.updateOne({
				$pull: { friendRequestsSent: receiverId },
			});

			await receiver.updateOne({
				$pull: { friendRequestsReceived: senderId },
			});

			return await this.usersService.userModel
				.findById(receiverId)
				.select(userSelectOptions)
				.populate(populateOptions);
		}
	}

	@Patch(":id/cancelFriendRequest")
	async cancelFriendRequest(@Req() req: any, @Param("id") receiverId: string) {
		const senderId = req.user.id;

		const sender = await this.usersService.userModel.findById(senderId);
		const receiver = await this.usersService.userModel.findById(receiverId);

		if (!receiver || !sender)
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);

		if (
			!sender.friendRequestsSent.includes(receiverId as any) ||
			!receiver.friendRequestsReceived.includes(senderId)
		)
			throw new HttpException(
				"No friend request found",
				HttpStatus.BAD_REQUEST
			);

		await sender.updateOne({
			$pull: { friendRequestsSent: receiverId },
		});

		await receiver.updateOne({
			$pull: { friendRequestsReceived: senderId },
		});

		return await this.usersService.userModel
			.findById(senderId)
			.select(userSelectOptions)
			.populate(populateOptions);
	}

	@Patch(":id/deleteFriend")
	async deleteFriend(@Param("id") friendId: any, @Req() req: any) {
		const userId = req.user.id;
		const user = await this.usersService.userModel.findById(userId);
		const friend = await this.usersService.userModel.findById(friendId);

		if (!user.friends.includes(friendId))
			throw new HttpException(
				"User is not in your friend list",
				HttpStatus.BAD_REQUEST
			);

		await user.updateOne({ $pull: { friends: friendId } });
		await friend.updateOne({ $pull: { friends: userId } });

		return await this.usersService.userModel
			.findById(userId)
			.select(userSelectOptions)
			.populate(populateOptions);
	}

	@Get("other/peopleYouMightKnow")
	async peopleYouMightKnow(@Req() req: any) {
		const loggedInUser: UserType = req.user;
		const users = await this.usersService.userModel
			.find({
				$and: [
					{ _id: { $ne: loggedInUser } },
					{ friends: { $nin: [loggedInUser.id] } },
				],
			})
			.populate(populateOptions)
			.select(userSelectOptions);
		return users;
	}

	// For updating all the documents, adding new fields etc
	@Post("update")
	async updateDocuments() {
		await this.usersService.userModel.updateMany(
			{},
			{ friendRequestsSent: [], friendRequestsReceived: [], friends: [] }
		);
		return "SUcces";
	}
}

type ActionType = "accept" | "decline";
