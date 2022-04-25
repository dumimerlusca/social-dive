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
const friends_service_1 = require("../services/friends.service");
const users_service_1 = require("../services/users.service");
let FriendsController = class FriendsController {
    constructor(friendRequestModel, friendshipModel, usersService, friendsService) {
        this.friendRequestModel = friendRequestModel;
        this.friendshipModel = friendshipModel;
        this.usersService = usersService;
        this.friendsService = friendsService;
    }
    async getUserFriends(userId) {
        const friends = await this.friendsService.getUserFriends(userId);
        return friends;
    }
    async deleteFriendship(req, userId) {
        const loggedInUserId = req.user.id;
        await this.friendshipModel.deleteOne({
            users: { $all: [userId, loggedInUserId] },
        });
        return "Friend deleted successfully";
    }
    async getUserSentFriendRequest(req) {
        const userId = req.user.id;
        return await this.friendRequestModel.find({ from: userId });
    }
    async getUserReceivedFriendRequest(req) {
        const userId = req.user.id;
        return await this.friendRequestModel.find({ to: userId });
    }
    async sendFriendRequest(body, req) {
        const fromUserId = req.user.id;
        const toUserId = body.to;
        const sender = await this.usersService.userModel.findById(fromUserId);
        const receiver = await this.usersService.userModel.findById(toUserId);
        if (fromUserId === toUserId)
            throw new common_1.HttpException("The 2 ids are the same", common_1.HttpStatus.BAD_REQUEST);
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
    async deleteFriendRequest(friendRequestId, req) {
        const userId = req.user.id;
        const friendRequest = await this.friendRequestModel.findById(friendRequestId);
        if (!friendRequest)
            throw new common_1.HttpException("Not Found", common_1.HttpStatus.NOT_FOUND);
        if (!this.friendsService.isPartOfFriendRequest(userId, friendRequest))
            throw new common_1.HttpException("Unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        await friendRequest.deleteOne();
        return "Request deleted success";
    }
    async acceptFriendRequest(friendRequestId, req) {
        const userId = req.user.id;
        const friendRequest = await this.friendRequestModel.findById(friendRequestId);
        if (!friendRequest)
            throw new common_1.HttpException("Not Found", common_1.HttpStatus.NOT_FOUND);
        if (!this.friendsService.isFriedRequestRecepient(userId, friendRequest))
            throw new common_1.HttpException("Unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        friendRequest.remove();
        return await this.friendshipModel.create({
            users: [friendRequest.from, friendRequest.to],
        });
    }
};
__decorate([
    (0, common_1.Get)("/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getUserFriends", null);
__decorate([
    (0, common_1.Delete)("/delete/:userId"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "deleteFriendship", null);
__decorate([
    (0, common_1.Get)("/requests/me/sent"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getUserSentFriendRequest", null);
__decorate([
    (0, common_1.Get)("/requests/me/received"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getUserReceivedFriendRequest", null);
__decorate([
    (0, common_1.Post)("/requests/send"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Delete)("/requests/:friendRequestId"),
    __param(0, (0, common_1.Param)("friendRequestId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "deleteFriendRequest", null);
__decorate([
    (0, common_1.Delete)("/requests/:friendRequestId/accept"),
    __param(0, (0, common_1.Param)("friendRequestId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "acceptFriendRequest", null);
FriendsController = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Controller)("api/friends"),
    __param(0, (0, mongoose_1.InjectModel)("FriendRequest")),
    __param(1, (0, mongoose_1.InjectModel)("Friendship")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.default,
        friends_service_1.default])
], FriendsController);
exports.default = FriendsController;
//# sourceMappingURL=friends.controller.js.map