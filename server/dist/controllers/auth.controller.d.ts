import { UserType } from "../schemas/user.schema";
import { Model } from "mongoose";
import UsersService from "../services/users.service";
export default class AuthController {
    private userModer;
    private usersService;
    constructor(userModer: Model<UserType>, usersService: UsersService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            password: any;
            _id: any;
            __v?: any;
            id?: any;
            fullName: string;
            email: string;
            photo: import("../schemas/user.schema").PhotoType;
            friends: import("mongoose").LeanDocument<UserType>[];
            friendRequestsSent: import("mongoose").LeanDocument<UserType>[];
            friendRequestsReceived: import("mongoose").LeanDocument<UserType>[];
        };
    }>;
    register(body: any): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    loadUser(req: any): Promise<any>;
}
