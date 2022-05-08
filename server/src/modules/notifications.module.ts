import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import NotificationsController from "../controllers/notifications.controller";
import { NotificationSchema } from "../schemas/notification.schema";
import NotificationService from "../services/notifications.service";
import FriendsModule from "./friends.module";

@Module({
	imports: [
		FriendsModule,
		MongooseModule.forFeature([
			{ name: "Notification", schema: NotificationSchema },
		]),
	],
	controllers: [NotificationsController],
	providers: [NotificationService],
	exports: [NotificationService],
})
export default class NotificationModule {}
