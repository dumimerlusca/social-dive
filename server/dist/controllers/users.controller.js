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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const formidable_1 = require("formidable");
const fs = require("fs");
const path = require("path");
const auth_guard_1 = require("../guards/auth.guard");
const decorators_1 = require("../decorators/decorators");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getAll(req) {
        return await this.usersService.userModel.find({}).select(users_service_1.userSelectOptions);
    }
    async getSingle(id) {
        const user = await this.usersService.userModel
            .findById(id)
            .select(users_service_1.userSelectOptions)
            .populate(users_service_1.populateOptions);
        if (!user)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async delete(id) {
        await this.usersService.delete(id);
        return `User with id ${id} was deleted successfully`;
    }
    async update(id, body) {
        return await this.usersService.update(id, body);
    }
    async upload(id, req, res) {
        const form = new formidable_1.IncomingForm();
        form.parse(req, async (error, field, files) => {
            if (error) {
                throw new common_1.HttpException("Server error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            let user;
            if (files === null || files === void 0 ? void 0 : files.photo) {
                user = await this.usersService.update(id, {
                    photo: {
                        data: fs.readFileSync(files.photo.filepath),
                        contentType: files.photo.mimetype,
                    },
                });
                if (!user)
                    return res.status(common_1.HttpStatus.NOT_FOUND).send("User not found");
            }
            return res.status(200).json(user);
        });
    }
    async getPhoto(id, req, res) {
        const user = await this.usersService.findById(id);
        if (!user)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        if (user === null || user === void 0 ? void 0 : user.photo) {
            res.set("Content-Type", user.photo.contentType);
            return res.send(user.photo.data);
        }
        res.sendFile("defaultProfilePhoto.png", {
            root: path.join(__dirname, "../../public"),
        });
    }
    async sendFriendRequest(req, receiverId) {
        const senderId = req.user.id;
        const sender = await this.usersService.userModel.findById(senderId);
        const receiver = await this.usersService.userModel.findById(receiverId);
        if (!receiver || !sender)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        if (sender.friendRequestsSent.includes(receiverId) ||
            sender.friendRequestsReceived.includes(senderId))
            throw new common_1.HttpException("Request already sent", common_1.HttpStatus.BAD_REQUEST);
        if (sender.friends.includes(receiverId))
            throw new common_1.HttpException("This user is already in your friend list", common_1.HttpStatus.BAD_REQUEST);
        await sender.updateOne({ $push: { friendRequestsSent: receiverId } }, { new: true });
        await receiver.updateOne({ $push: { friendRequestsReceived: senderId } }, { new: true });
        return await this.usersService.userModel
            .findById(senderId)
            .select(users_service_1.userSelectOptions)
            .populate(users_service_1.populateOptions);
    }
    async respondToFriendRequest(action, senderId, req) {
        if (action !== "accept" && action !== "decline")
            return "Action not valid, must be 'accept' or 'decline'";
        const receiverId = req.user.id;
        const sender = await this.usersService.userModel.findById(senderId);
        const receiver = await this.usersService.userModel.findById(receiverId);
        if (!receiver || !sender)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        if (!sender.friendRequestsSent.includes(receiverId) ||
            !receiver.friendRequestsReceived.includes(senderId))
            throw new common_1.HttpException("No friend request found", common_1.HttpStatus.BAD_REQUEST);
        if (action === "accept") {
            await sender.updateOne({
                $pull: { friendRequestsSent: receiverId },
                $push: { friends: receiverId },
            });
            await receiver.updateOne({
                $pull: { friendRequestsReceived: senderId },
                $push: { friends: senderId },
            });
            return await this.usersService.userModel
                .findById(receiverId)
                .select(users_service_1.userSelectOptions)
                .populate(users_service_1.populateOptions);
        }
        if (action === "decline") {
            await sender.updateOne({
                $pull: { friendRequestsSent: receiverId },
            });
            await receiver.updateOne({
                $pull: { friendRequestsReceived: senderId },
            });
            return await this.usersService.userModel
                .findById(receiverId)
                .select(users_service_1.userSelectOptions)
                .populate(users_service_1.populateOptions);
        }
    }
    async cancelFriendRequest(req, receiverId) {
        const senderId = req.user.id;
        const sender = await this.usersService.userModel.findById(senderId);
        const receiver = await this.usersService.userModel.findById(receiverId);
        if (!receiver || !sender)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        if (!sender.friendRequestsSent.includes(receiverId) ||
            !receiver.friendRequestsReceived.includes(senderId))
            throw new common_1.HttpException("No friend request found", common_1.HttpStatus.BAD_REQUEST);
        await sender.updateOne({
            $pull: { friendRequestsSent: receiverId },
        });
        await receiver.updateOne({
            $pull: { friendRequestsReceived: senderId },
        });
        return await this.usersService.userModel
            .findById(senderId)
            .select(users_service_1.userSelectOptions)
            .populate(users_service_1.populateOptions);
    }
    async deleteFriend(friendId, req) {
        const userId = req.user.id;
        const user = await this.usersService.userModel.findById(userId);
        const friend = await this.usersService.userModel.findById(friendId);
        if (!user.friends.includes(friendId))
            throw new common_1.HttpException("User is not in your friend list", common_1.HttpStatus.BAD_REQUEST);
        await user.updateOne({ $pull: { friends: friendId } });
        await friend.updateOne({ $pull: { friends: userId } });
        return await this.usersService.userModel
            .findById(userId)
            .select(users_service_1.userSelectOptions)
            .populate(users_service_1.populateOptions);
    }
    async peopleYouMightKnow(req) {
        const loggedInUser = req.user;
        const users = await this.usersService.userModel
            .find({
            $and: [
                { _id: { $ne: loggedInUser } },
                { friends: { $nin: [loggedInUser.id] } },
            ],
        })
            .populate(users_service_1.populateOptions)
            .select(users_service_1.userSelectOptions);
        return users;
    }
    async updateDocuments() {
        await this.usersService.userModel.updateMany({}, { friendRequestsSent: [], friendRequestsReceived: [], friends: [] });
        return "SUcces";
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSingle", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(":id/upload"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(":id/photo"),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPhoto", null);
__decorate([
    (0, common_1.Patch)(":id/sendFriendRequest"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Patch)(":id/respondToFriendRequest"),
    __param(0, (0, common_1.Query)("action")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "respondToFriendRequest", null);
__decorate([
    (0, common_1.Patch)(":id/cancelFriendRequest"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "cancelFriendRequest", null);
__decorate([
    (0, common_1.Patch)(":id/deleteFriend"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteFriend", null);
__decorate([
    (0, common_1.Get)("other/peopleYouMightKnow"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "peopleYouMightKnow", null);
__decorate([
    (0, common_1.Post)("update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateDocuments", null);
UsersController = __decorate([
    (0, common_1.Controller)("api/users"),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.default])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map