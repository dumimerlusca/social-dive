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
exports.UserSchema = exports.User = exports.PhotoType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class PhotoType {
}
exports.PhotoType = PhotoType;
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "Full name is required"] }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, "Email is required"],
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, "Password is required"],
        minlength: 6,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            data: Buffer,
            contentType: String,
        },
    }),
    __metadata("design:type", PhotoType)
], User.prototype, "photo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "friendRequestsSent", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "friendRequestsReceived", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Date)
], User.prototype, "lastActive", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, validateBeforeSave: true })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map