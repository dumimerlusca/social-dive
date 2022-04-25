import { Module } from "@nestjs/common";
import { EventsGateway } from "../controllers/events.gateway";
import { UsersModule } from "./users.module";

@Module({
	imports: [UsersModule],
	providers: [EventsGateway],
})
export default class EventsModule {}
