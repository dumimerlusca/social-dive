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
const users_service_1 = require("../services/users.service");
let FriendsController = class FriendsController {
    constructor(friendRequestModel, friendshipModel, usersService) {
        this.friendRequestModel = friendRequestModel;
        this.friendshipModel = friendshipModel;
        this.usersService = usersService;
    }
    test() {
        return "test";
    }
    async sendFriendRequest(body, req) {
        const fromUserId = req.user.id;
        const toUserId = body.to;
        const sender = await this.usersService.userModel.findById(fromUserId);
        const receiver = await this.usersService.userModel.findById(toUserId);
        if (!receiver || !sender)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        const requestAlreadyExists = await this.friendRequestModel.findOne({
            $or: [
                {
                    from: fromUserId,
                    to: toUserId,
                },
                {
                    to: fromUserId,
                    from: toUserId,
                },
            ],
        });
        if (requestAlreadyExists)
            throw new common_1.HttpException("Request already sent", common_1.HttpStatus.BAD_REQUEST);
        const isAlreadyFriend = await this.friendshipModel.findOne({
            users: { $all: [fromUserId, toUserId] },
        });
        if (isAlreadyFriend)
            throw new common_1.HttpException("This user is already in your friend list", common_1.HttpStatus.BAD_REQUEST);
        return await this.friendRequestModel.create({
            from: fromUserId,
            to: toUserId,
        });
    }
    async deleteFriendRequest() { }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "test", null);
__decorate([
    (0, common_1.Post)("send"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Delete)("/:friendRequestId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "deleteFriendRequest", null);
FriendsController = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Controller)("api/friendRequests"),
    __param(0, (0, mongoose_1.InjectModel)("FriendRequest")),
    __param(1, (0, mongoose_1.InjectModel)("Friendship")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.default])
], FriendsController);
exports.default = FriendsController;
//# sourceMappingURL=friendsController.controller.js.map