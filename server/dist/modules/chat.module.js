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
const chat_controller_1 = require("../controllers/chat.controller");
const messages_controller_1 = require("../controllers/messages.controller");
const chat_schema_1 = require("../schemas/chat.schema");
const message_schema_1 = require("../schemas/message.schema");
const chat_service_1 = require("../services/chat.service");
const users_module_1 = require("./users.module");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                { name: "Message", schema: message_schema_1.MessageSchema },
                { name: "Chat", schema: chat_schema_1.ChatSchema },
            ]),
        ],
        providers: [chat_service_1.default],
        exports: [mongoose_1.MongooseModule, chat_service_1.default],
        controllers: [chat_controller_1.default, messages_controller_1.default],
    })
], ChatModule);
exports.default = ChatModule;
//# sourceMappingURL=chat.module.js.map