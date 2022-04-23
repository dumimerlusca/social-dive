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
exports.populateOptions = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("./users.service");
exports.populateOptions = [
    {
        path: "users",
        model: "User",
        select: users_service_1.userSelectOptions,
    },
];
let ChatService = class ChatService {
    constructor(chatModel, messageModel) {
        this.chatModel = chatModel;
        this.messageModel = messageModel;
    }
    async checkExistingConversation(user1Id, user2Id) {
        return await this.chatModel.findOne({
            $or: [{ users: [user1Id, user2Id] }, { users: [user2Id, user1Id] }],
        });
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Chat")),
    __param(1, (0, mongoose_1.InjectModel)("Message")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ChatService);
exports.default = ChatService;
//# sourceMappingURL=chat.service.js.map