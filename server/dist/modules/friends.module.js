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
const friends_controller_1 = require("../controllers/friends.controller");
const friendRequest_chema_1 = require("../schemas/friendRequest.chema");
const friendship_schema_1 = require("../schemas/friendship.schema");
const friends_service_1 = require("../services/friends.service");
const users_module_1 = require("./users.module");
let FriendsModule = class FriendsModule {
};
FriendsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                { name: "FriendRequest", schema: friendRequest_chema_1.default },
                { name: "Friendship", schema: friendship_schema_1.default },
            ]),
        ],
        providers: [friends_service_1.default],
        controllers: [friends_controller_1.default],
    })
], FriendsModule);
exports.default = FriendsModule;
//# sourceMappingURL=friends.module.js.map