import { Model } from "mongoose";
import UsersService from "../services/users.service";
export default class FriendsController {
    readonly friendRequestModel: Model<any>;
    readonly friendshipModel: Model<any>;
    readonly usersService: UsersService;
    constructor(friendRequestModel: Model<any>, friendshipModel: Model<any>, usersService: UsersService);
    test(): string;
    sendFriendRequest(body: {
        to: string;
    }, req: any): Promise<any>;
    deleteFriendRequest(): Promise<void>;
}
