import { Module } from "@nestjs/common";
import { EventsGateway } from "../controllers/events.gateway";

@Module({
	providers: [EventsGateway],
})
export default class EventsModule {}
