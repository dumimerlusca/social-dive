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
const users_service_1 = require("../services/users.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongodb_1 = require("mongodb");
const decorators_1 = require("../decorators/decorators");
let AuthController = class AuthController {
    constructor(userModer, usersService) {
        this.userModer = userModer;
        this.usersService = usersService;
    }
    async login(body) {
        const user = await this.usersService.userModel
            .findOne({ email: body.email })
            .select("-photo")
            .populate(users_service_1.populateOptions);
        if (!user)
            throw new common_1.HttpException("Invalid credentials", common_1.HttpStatus.UNAUTHORIZED);
        const isValidPassword = await bcrypt.compare(body.password, user.password);
        if (!isValidPassword)
            throw new common_1.HttpException("Invalid credentials", common_1.HttpStatus.UNAUTHORIZED);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        return {
            token,
            user: Object.assign(Object.assign({}, user.toObject()), { password: null }),
        };
    }
    async register(body) {
        try {
            await this.usersService.validate(body);
        }
        catch (error) {
            throw new mongodb_1.MongoError(error);
        }
        body.password = await bcrypt.hash(body.password, 10);
        const user = await this.usersService.create(body);
        return user;
    }
    async loadUser(req) {
        const user = req.user;
        return user;
    }
};
__decorate([
    (0, common_1.Post)("login"),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, decorators_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("user"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loadUser", null);
AuthController = __decorate([
    (0, common_1.Controller)("/api/auth"),
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.default])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map