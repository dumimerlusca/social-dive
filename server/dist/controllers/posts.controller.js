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
const posts_service_1 = require("../services/posts.service");
const formidable_1 = require("formidable");
const fs = require("fs");
const users_service_1 = require("../services/users.service");
const decorators_1 = require("../decorators/decorators");
const friends_service_1 = require("../services/friends.service");
let PostsController = class PostsController {
    constructor(postModel, usersService, postsService, friendsService) {
        this.postModel = postModel;
        this.usersService = usersService;
        this.postsService = postsService;
        this.friendsService = friendsService;
    }
    async create(req, res) {
        const user = req.user;
        const contentType = req.header("content-type");
        if (!contentType.includes("multipart/form-data"))
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        const form = new formidable_1.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            if (error) {
                return res.status(500).json({
                    statusCode: 500,
                    message: "Server error",
                });
            }
            if (!fields.description && !files.photo) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "The post needs a description or a photo, or both",
                });
            }
            const post = Object.assign(Object.assign({}, fields), { user: user.id });
            if (files.photo) {
                post.photo = {
                    data: fs.readFileSync(files.photo.filepath),
                    contentType: files.photo.mimetype,
                };
            }
            const createdPost = await this.postsService.create(post);
            res.status(common_1.HttpStatus.CREATED).json(createdPost);
        });
    }
    async getNewsfeedPosts(req) {
        const userId = req.user.id;
        const friends = await this.friendsService.getUserFriends(userId);
        return await this.postsService.postModel
            .find({ $or: [{ user: { $in: friends } }, { user: userId }] })
            .sort({ createdAt: -1 })
            .populate(posts_service_1.populateOptions);
    }
    async getAll(userId) {
        if (!userId)
            return await this.postsService.postModel
                .find({})
                .populate(posts_service_1.populateOptions)
                .sort({ createdAt: -1 });
        return await this.postsService.postModel
            .find({ user: userId })
            .populate(posts_service_1.populateOptions)
            .sort({ createdAt: -1 });
    }
    async getSingle(id) {
        const post = await this.postsService.postModel
            .findById(id)
            .populate(posts_service_1.populateOptions)
            .select("-photo");
        if (!post)
            throw new common_1.HttpException("Post not found", common_1.HttpStatus.NOT_FOUND);
        return post;
    }
    async updatePost(id, body) {
        const post = await this.postsService.updateById(id, body);
        if (!post)
            throw new common_1.HttpException("Post not found", common_1.HttpStatus.NOT_FOUND);
        return post;
    }
    async getPhoto(id, res) {
        const post = await this.postsService.findById(id);
        if (!post)
            throw new common_1.HttpException("Post not found", common_1.HttpStatus.NOT_FOUND);
        if (!post.photo)
            throw new common_1.HttpException("No photo found", common_1.HttpStatus.NOT_FOUND);
        res.set("Content-Type", post.photo.contentType);
        return res.send(post.photo.data);
    }
    async delete(id, req) {
        const loggedInUser = req.user;
        const post = await this.postsService.postModel.findById(id);
        if (post.user.toString() !== loggedInUser.id)
            throw new common_1.HttpException("UNAUTHORIZED", common_1.HttpStatus.UNAUTHORIZED);
        await post.remove();
        return "Post deleted";
    }
    async likePost(id, req) {
        const user = req.user;
        const post = await this.postModel.findById(id).select(posts_service_1.selectOptions);
        if (!post)
            throw new common_1.HttpException("No photo found", common_1.HttpStatus.NOT_FOUND);
        if (post.likes.includes(user.id))
            throw new common_1.HttpException("Post is liked already", common_1.HttpStatus.BAD_REQUEST);
        await post.updateOne({
            $push: { likes: user.id },
        }, { runValidators: true });
        return "Post liked successfully";
    }
    async unlikePost(id, req) {
        const user = req.user;
        let post = await this.postModel.findById(id).select(posts_service_1.selectOptions);
        if (!post)
            throw new common_1.HttpException("No photo found", common_1.HttpStatus.NOT_FOUND);
        if (!post.likes.includes(user.id))
            throw new common_1.HttpException("Post is not liked", common_1.HttpStatus.BAD_REQUEST);
        await post.updateOne({
            $pull: { likes: user.id },
        }, { runValidators: true });
        return "Post unliked successfully";
    }
    async updateDocuments() {
        await this.postsService.postModel.deleteMany({});
        return "Posts updated";
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("newsfeed"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getNewsfeedPosts", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getSingle", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Get)(":id/photo"),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPhoto", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(":id/like"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "likePost", null);
__decorate([
    (0, common_1.Patch)(":id/unlike"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "unlikePost", null);
__decorate([
    (0, common_1.Post)("update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updateDocuments", null);
PostsController = __decorate([
    (0, common_1.Controller)("api/posts"),
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Post")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.default,
        posts_service_1.PostsService,
        friends_service_1.default])
], PostsController);
exports.default = PostsController;
//# sourceMappingURL=posts.controller.js.map