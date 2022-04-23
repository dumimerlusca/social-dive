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
exports.PostsService = exports.selectOptions = exports.populateOptions = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
exports.populateOptions = [
    {
        path: "user",
        model: "User",
        select: "-photo -password",
    },
    {
        path: "likes",
        model: "User",
        select: "-password",
    },
];
exports.selectOptions = "-photo";
let PostsService = class PostsService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async create(post) {
        var _a;
        return (_a = (await this.postModel.create(post))) === null || _a === void 0 ? void 0 : _a.populate(exports.populateOptions);
    }
    async findAll() {
        return await this.postModel
            .find({})
            .populate(exports.populateOptions)
            .select(exports.selectOptions);
    }
    async find(query) {
        return await this.postModel
            .find(query)
            .populate(exports.populateOptions)
            .select(exports.selectOptions);
    }
    async findById(id) {
        return await this.postModel.findById(id).populate(exports.populateOptions);
    }
    async findOneAndUpdate(query, body) {
        return await this.postModel
            .findOneAndUpdate(query, body, {
            new: true,
            runValidators: true,
        })
            .populate(exports.populateOptions)
            .select(exports.selectOptions);
    }
    async findByIdAndUpdate(query, body) {
        return await this.postModel
            .findByIdAndUpdate(query, body, {
            new: true,
            runValidators: true,
        })
            .populate(exports.populateOptions)
            .select(exports.selectOptions);
    }
    async update(query, body) {
        return await this.postModel
            .findOneAndUpdate({ query }, body, {
            new: true,
            runValidators: true,
        })
            .populate(exports.populateOptions)
            .select(exports.selectOptions);
    }
    async updateById(id, body) {
        return await this.postModel
            .findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })
            .populate(exports.populateOptions)
            .select(exports.selectOptions);
    }
    async delete(id) {
        return await this.postModel.findByIdAndDelete(id);
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Post")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map