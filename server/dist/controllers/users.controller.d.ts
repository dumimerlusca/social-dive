import { Request, Response } from "express";
import UsersService from "../services/users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
    sendFriendRequest(req: any, receiverId: any): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    respondToFriendRequest(action: "accept" | "decline", senderId: string, req: any): Promise<(import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }) | "Action not valid, must be 'accept' or 'decline'">;
    cancelFriendRequest(req: any, receiverId: string): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteFriend(friendId: any, req: any): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    peopleYouMightKnow(req: any): Promise<Omit<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    updateDocuments(): Promise<string>;
}
