import { Request, Response } from "express";
import UsersService from "../services/users.service";
import FriendsService from "../services/friends.service";
export declare class UsersController {
    private usersService;
    private friendsService;
    constructor(usersService: UsersService, friendsService: FriendsService);
    getAll(req: any): Promise<(import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getSingle(id: string): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete(id: string): Promise<string>;
    update(id: string, body: Object): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    upload(id: string, req: Request, res: Response): Promise<void>;
    getPhoto(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    peopleYouMightKnow(req: any): Promise<(import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    updateDocuments(): Promise<string>;
}
