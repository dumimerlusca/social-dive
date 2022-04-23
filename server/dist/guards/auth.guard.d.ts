import { CanActivate, ExecutionContext } from "@nestjs/common";
import UsersService from "../services/users.service";
import { Reflector } from "@nestjs/core";
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private usersService;
    constructor(reflector: Reflector, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
