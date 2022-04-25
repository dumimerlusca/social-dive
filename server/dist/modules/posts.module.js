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
const posts_controller_1 = require("../controllers/posts.controller");
const post_schema_1 = require("../schemas/post.schema");
const comments_service_1 = require("../services/comments.service");
const posts_service_1 = require("../services/posts.service");
const comments_module_1 = require("./comments.module");
const friends_module_1 = require("./friends.module");
const users_module_1 = require("./users.module");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            friends_module_1.default,
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: "Post",
                    imports: [comments_module_1.default],
                    useFactory: (commentsService) => {
                        const schema = post_schema_1.PostSchema;
                        schema.post("remove", post => {
                            commentsService.cascadeDeleteComments(post._id);
                        });
                        return schema;
                    },
                    inject: [comments_service_1.default],
                },
            ]),
        ],
        controllers: [posts_controller_1.default],
        providers: [posts_service_1.PostsService],
        exports: [mongoose_1.MongooseModule, posts_service_1.PostsService],
    })
], PostsModule);
exports.default = PostsModule;
//# sourceMappingURL=posts.module.js.map