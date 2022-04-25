import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import UsersService from "../services/users.service";
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    readonly usersService: UsersService;
    constructor(usersService: UsersService);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    test(data: any, client: Socket): void;
    privateMessage(data: {
        content: any;
        to: string;
    }, client: Socket): void;
    isTyping(client: Socket, data: {
        from: string;
        to: string;
    }): void;
}
