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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_service_1 = require("../services/chat.service");
let MessagesController = class MessagesController {
    constructor(messageModel, chatService) {
        this.messageModel = messageModel;
        this.chatService = chatService;
    }
    test() {
        console.log("test");
    }
    async getAllChatMessages(chatId) {
        return await this.messageModel.find({ chatId });
    }
    async sendMessage(chatId, req, body) {
        const senderId = req.user.id;
        const chat = await this.chatService.chatModel.findById(chatId);
        if (!chat)
            throw new common_1.HttpException("Chat not found", common_1.HttpStatus.NOT_FOUND);
        if (!chat.users.includes(senderId))
            throw new common_1.HttpException("Unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        const message = {
            user: senderId,
            text: body.message,
            chatId: chatId,
        };
        await chat.updateOne({
            lastMessage: message.text,
            $inc: { totalMessages: 1 },
        });
        return await this.messageModel.create(message);
    }
    async editMessage() { }
    async deleteMessage() { }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "test", null);
__decorate([
    (0, common_1.Get)("/chat/:chatId"),
    __param(0, (0, common_1.Param)("chatId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getAllChatMessages", null);
__decorate([
    (0, common_1.Post)("/chat/:chatId"),
    __param(0, (0, common_1.Param)("chatId")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Patch)("/:messageId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "editMessage", null);
__decorate([
    (0, common_1.Delete)("/:messageId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "deleteMessage", null);
MessagesController = __decorate([
    (0, common_1.Controller)("api/messages"),
    __param(0, (0, mongoose_1.InjectModel)("Message")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        chat_service_1.default])
], MessagesController);
exports.default = MessagesController;
//# sourceMappingURL=messages.controller.js.map