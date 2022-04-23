"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comments_controller_1 = require("../controllers/comments.controller");
const comment_schema_1 = require("../schemas/comment.schema");
const comments_service_1 = require("../services/comments.service");
const posts_module_1 = require("./posts.module");
const users_module_1 = require("./users.module");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            (0, common_1.forwardRef)(() => posts_module_1.default),
            mongoose_1.MongooseModule.forFeature([{ name: "Comment", schema: comment_schema_1.CommentSchema }]),
        ],
        providers: [comments_service_1.default],
        controllers: [comments_controller_1.default],
        exports: [mongoose_1.MongooseModule, comments_service_1.default],
    })
], CommentsModule);
exports.default = CommentsModule;
//# sourceMappingURL=comments.module.js.map