import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PopulateOptions } from "mongoose";
import { CommentType } from "../schemas/comment.schema";
import { PostsService } from "./posts.service";

export const populateOptions: PopulateOptions[] = [
	{
		path: "user likes",
		model: "User",
		select: "-password",
	},
];

@Injectable()
class CommentsService {
	constructor(
		@InjectModel("Comment") public commentModel: Model<CommentType>
	) {}
	async cascadeDeleteComments(postId: string) {
		console.log("Delete coments", postId);
		await this.commentModel.deleteMany({ postId });
	}

	test() {
		console.log("COmments service working");
	}
}

export default CommentsService;
