"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let MongoExceptionFilter = class MongoExceptionFilter {
    catch(exception, host) {
        var _a, _b, _c;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = (_a = exception === null || exception === void 0 ? void 0 : exception.status) !== null && _a !== void 0 ? _a : 500;
        const message = getErrorMessage(exception);
        const name = (_b = exception === null || exception === void 0 ? void 0 : exception.name) !== null && _b !== void 0 ? _b : "Error";
        const errorCode = (_c = exception === null || exception === void 0 ? void 0 : exception.code) !== null && _c !== void 0 ? _c : "default";
        if (name === "CastError")
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: message,
            });
        if (errorCode === 11000)
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Duplicate fields",
            });
        return response.status(status).json({
            statusCode: status,
            message: message,
        });
    }
};
MongoExceptionFilter = __decorate([
    (0, common_1.Catch)()
], MongoExceptionFilter);
exports.MongoExceptionFilter = MongoExceptionFilter;
function getErrorMessage(exception) {
    if (exception === null || exception === void 0 ? void 0 : exception.message)
        return exception.message;
    if (typeof exception.response === "string")
        return exception.response;
    if (exception.response.message)
        return exception.response.message;
    return "Internal server error";
}
//# sourceMappingURL=mongo.filter.js.map