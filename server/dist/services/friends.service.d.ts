import { FriendRequestType } from "../schemas/friendRequest.chema";
import { FriendshipType } from "../schemas/friendship.schema";
import UsersService from "./users.service";
import { Model } from "mongoose";
export default class FriendsService {
    readonly friendRequestModel: Model<FriendRequestType>;
    readonly friendshipModel: Model<FriendshipType>;
    readonly usersService: UsersService;
    constructor(friendRequestModel: Model<FriendRequestType>, friendshipModel: Model<FriendshipType>, usersService: UsersService);
    isPartOfFriendRequest(userId: string, friendRequest: FriendRequestType): boolean;
    isFriedRequestRecepient(userId: string, friendRequest: FriendRequestType): boolean;
}
