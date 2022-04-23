import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import UsersService from "../services/users.service";
export declare class AuthenticationRequired implements NestMiddleware {
    private usersService;
    constructor(usersService: UsersService);
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
