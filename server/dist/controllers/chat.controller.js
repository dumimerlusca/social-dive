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
const common_1 = require("@nestjs/common");
const chat_service_1 = require("../services/chat.service");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async createChat(body, req) {
        const senderId = req.user.id;
        const receiverId = body.userId;
        if (!receiverId)
            throw new common_1.HttpException("Bad request, no userID found in the body", common_1.HttpStatus.BAD_REQUEST);
        if (senderId === receiverId)
            throw new common_1.HttpException("You can't send messages to yourself", common_1.HttpStatus.BAD_REQUEST);
        const existingConversation = await this.chatService.checkExistingConversation(senderId, receiverId);
        if (existingConversation)
            return existingConversation.populate(chat_service_1.populateOptions);
        const chat = {
            users: [senderId, receiverId],
            initiatedBy: senderId,
        };
        const newChat = await this.chatService.chatModel.create(chat);
        return await newChat.populate(chat_service_1.populateOptions);
    }
    async getAllChatsOfCurrentUser(req) {
        const userId = req.user.id;
        const chats = await this.chatService.chatModel
            .find({ users: userId })
            .sort({ updatedAt: -1 })
            .populate(chat_service_1.populateOptions);
        return chats.filter(chat => {
            if (chat.totalMessages === 0 &&
                String(chat.initiatedBy) !== String(userId))
                return null;
            return chat;
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getAllChatsOfCurrentUser", null);
ChatController = __decorate([
    (0, common_1.Controller)("api/chat"),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_service_1.default])
], ChatController);
exports.default = ChatController;
//# sourceMappingURL=chat.controller.js.map