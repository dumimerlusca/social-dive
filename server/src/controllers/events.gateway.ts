import { Injectable } from "@nestjs/common";
import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
@Injectable()
export class EventsGateway {
	@WebSocketServer()
	server: Server;

	@SubscribeMessage("test")
	test() {
		console.log("test");
	}
}
