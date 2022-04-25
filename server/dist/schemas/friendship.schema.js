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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Friendship = class Friendship {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }],
        required: true,
        validate: [
            (array) => array.length === 2,
            "Array length must be exactly 2 elements",
        ],
    }),
    __metadata("design:type", Array)
], Friendship.prototype, "users", void 0);
Friendship = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Friendship);
const FriendshipSchema = mongoose_1.SchemaFactory.createForClass(Friendship);
exports.default = FriendshipSchema;
//# sourceMappingURL=friendship.schema.js.map