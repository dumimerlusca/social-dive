"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const users_service_1 = require("../services/users.service");
let EventsGateway = class EventsGateway {
    constructor(usersService) {
        this.usersService = usersService;
    }
    afterInit(server) {
        console.log("Init");
    }
    handleConnection(client) {
        console.log("Connected", client.handshake.auth.fullName, client.id);
        const userId = client.handshake.auth._id;
        console.log(userId);
        this.usersService.makeUserActive(userId);
    }
    handleDisconnect(client) {
        console.log("Disconnect", client.handshake.auth.fullName, client.id);
        const userId = client.handshake.auth._id;
        this.usersService.makeUserInactive(userId);
    }
    test(data, client) {
        console.log("test", client.id);
        client.emit("hello", client.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("test"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "test", null);
EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.default])
], EventsGateway);
exports.EventsGateway = EventsGateway;
//# sourceMappingURL=events.gateway.js.map