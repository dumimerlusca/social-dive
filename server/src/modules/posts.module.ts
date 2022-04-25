import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import PostsController from "../controllers/posts.controller";
import { PostSchema } from "../schemas/post.schema";
import CommentsService from "../services/comments.service";
import { PostsService } from "../services/posts.service";
import CommentsModule from "./comments.module";
import FriendsModule from "./friends.module";
import { UsersModule } from "./users.module";

@Module({
	imports: [
		UsersModule,
		FriendsModule,
		MongooseModule.forFeatureAsync([
			{
				name: "Post",
				imports: [CommentsModule],
				useFactory: (commentsService: CommentsService) => {
					const schema = PostSchema;
					schema.post("remove", post => {
						commentsService.cascadeDeleteComments(post._id);
					});
					return schema;
				},
				inject: [CommentsService],
			},
		]),
	],
	controllers: [PostsController],
	providers: [PostsService],
	exports: [MongooseModule, PostsService],
})
export default class PostsModule {}
