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
		console.log(userId);
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
		console.log("test", client.id);
		client.emit("hello", client.id);
	}
}
