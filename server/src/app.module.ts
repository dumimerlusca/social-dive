import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users.module";
import AuthModule from "./modules/auth.module";
import PostsModule from "./modules/posts.module";
import CommentsModule from "./modules/comments.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import ChatModule from "./modules/chat.module";
import EventsModule from "./modules/events.module";
import FriendsModule from "./modules/friends.module";
import NotificationModule from "./modules/notifications.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI),
		UsersModule,
		AuthModule,
		PostsModule,
		CommentsModule,
		ChatModule,
		EventsModule,
		FriendsModule,
		NotificationModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
