import { Injectable } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import UsersService from "../services/users.service";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
@Injectable()
export class EventsGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	constructor(readonly usersService: UsersService) {}

	@WebSocketServer()
	server: Server;

	afterInit(server: Server) {
		console.log("Init");
	}

	handleConnection(@ConnectedSocket() client: Socket) {
		console.log("Connected", client.handshake.auth.fullName, client.id);

		const userId = client.handshake.auth._id;
		client.join(userId);
		// Make user active
		this.usersService.makeUserActive(userId);
	}

	handleDisconnect(client: Socket) {
		console.log("Disconnect", client.handshake.auth.fullName, client.id);

		const userId = client.handshake.auth._id;
		// Make user inactive
		this.usersService.makeUserInactive(userId);
	}

	@SubscribeMessage("test")
	test(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
		client.emit("hello", client.id);
	}

	@SubscribeMessage("privateMessage")
	privateMessage(
		@MessageBody() data: { content: any; to: string },
		@ConnectedSocket() client: Socket
	) {
		const { content, to } = data;
		client.to(to).emit("privateMessage", content);
	}

	@SubscribeMessage("isTyping")
	isTyping(
		@ConnectedSocket() client: Socket,
		@MessageBody() data: { from: string; to: string }
	) {
		client.to(data.to).emit("isTyping", data.from);
	}
}
