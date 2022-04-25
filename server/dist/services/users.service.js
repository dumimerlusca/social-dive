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
exports.populateOptions = exports.userSelectOptions = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
exports.userSelectOptions = "-password -photo";
exports.populateOptions = [
    {
        path: "friends friendRequestsReceived friendRequestsSent",
        model: "User",
        select: exports.userSelectOptions,
    },
];
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(user) {
        return await this.userModel.create(user);
    }
    async findById(id, userSelectOptions, populate = true) {
        return this.userModel.findById(id).select(userSelectOptions);
    }
    async find(fields) {
        return this.userModel.find(fields);
    }
    async findOne(fields) {
        return this.userModel.findOne(fields);
    }
    async delete(id) {
        return this.userModel.findByIdAndDelete(id);
    }
    async update(id, body) {
        return this.userModel.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
    }
    async validate(body) {
        return this.userModel.validate(body);
    }
    async makeUserActive(userId) {
        await this.userModel.findByIdAndUpdate(userId, {
            isActive: true,
            lastActive: new Date(Date.now()),
        });
    }
    async makeUserInactive(userId) {
        await this.userModel.findByIdAndUpdate(userId, {
            isActive: false,
            lastActive: new Date(Date.now()),
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map