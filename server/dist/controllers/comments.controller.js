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
const comments_service_1 = require("../services/comments.service");
const posts_service_1 = require("../services/posts.service");
let CommentsController = class CommentsController {
    constructor(commentsService, postsService) {
        this.commentsService = commentsService;
        this.postsService = postsService;
    }
    async getPostComments(postId) {
        const post = await this.postsService.postModel.findById(postId);
        if (!post)
            throw new common_1.HttpException("Post not found", common_1.HttpStatus.NOT_FOUND);
        return await this.commentsService.commentModel
            .find({ postId: postId })
            .sort({ createdAt: -1 })
            .populate(comments_service_1.populateOptions);
    }
    async addComment(postId, req, body) {
        const userId = req.user.id;
        const comment = await this.commentsService.commentModel.create(Object.assign(Object.assign({}, body), { postId, user: userId }));
        return await comment.populate(comments_service_1.populateOptions);
    }
    async editComment(commentId, body) {
        return await this.commentsService.commentModel.findByIdAndUpdate(commentId, body, { new: true, runValidators: true });
    }
    async likeComment(commentId, req) {
        const userId = req.user.id;
        const comment = await this.commentsService.commentModel.findById(commentId);
        if (comment.likes.includes(userId))
            throw new common_1.HttpException("Comment is already liked", common_1.HttpStatus.BAD_REQUEST);
        await comment.updateOne({ $push: { likes: userId } });
        return "Comment liked successfuly";
    }
    async unlikeComment(commentId, req) {
        const userId = req.user.id;
        const comment = await this.commentsService.commentModel.findById(commentId);
        if (!comment.likes.includes(userId))
            throw new common_1.HttpException("Comment is not liked", common_1.HttpStatus.BAD_REQUEST);
        await comment.updateOne({ $pull: { likes: userId } });
        return "Comment unliked successfuly";
    }
    async deleteComment(commentId) {
        await this.commentsService.commentModel.findByIdAndDelete(commentId);
        return "Comment deleted successfully";
    }
};
__decorate([
    (0, common_1.Get)("post/:postId"),
    __param(0, (0, common_1.Param)("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getPostComments", null);
__decorate([
    (0, common_1.Post)("post/:postId/addComment"),
    __param(0, (0, common_1.Param)("postId")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Patch)(":commentId"),
    __param(0, (0, common_1.Param)("commentId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "editComment", null);
__decorate([
    (0, common_1.Patch)(":commentId/like"),
    __param(0, (0, common_1.Param)("commentId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "likeComment", null);
__decorate([
    (0, common_1.Patch)(":commentId/unlike"),
    __param(0, (0, common_1.Param)("commentId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "unlikeComment", null);
__decorate([
    (0, common_1.Delete)(":commentId"),
    __param(0, (0, common_1.Param)("commentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
CommentsController = __decorate([
    (0, common_1.Controller)("api/comments"),
    __metadata("design:paramtypes", [comments_service_1.default,
        posts_service_1.PostsService])
], CommentsController);
exports.default = CommentsController;
//# sourceMappingURL=comments.controller.js.map