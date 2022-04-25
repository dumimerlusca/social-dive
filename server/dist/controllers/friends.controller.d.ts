/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from "mongoose";
import { FriendRequestType } from "../schemas/friendRequest.chema";
import { FriendshipType } from "../schemas/friendship.schema";
import FriendsService from "../services/friends.service";
import UsersService from "../services/users.service";
export default class FriendsController {
    readonly friendRequestModel: Model<FriendRequestType>;
    readonly friendshipModel: Model<FriendshipType>;
    readonly usersService: UsersService;
    readonly friendsService: FriendsService;
    constructor(friendRequestModel: Model<FriendRequestType>, friendshipModel: Model<FriendshipType>, usersService: UsersService, friendsService: FriendsService);
    getUserFriends(userId: string): Promise<string[]>;
    deleteFriendship(req: any, userId: string): Promise<string>;
    getUserSentFriendRequest(req: any): Promise<(FriendRequestType & {
        _id: any;
    })[]>;
    getUserReceivedFriendRequest(req: any): Promise<(FriendRequestType & {
        _id: any;
    })[]>;
    sendFriendRequest(body: {
        to: string;
    }, req: any): Promise<FriendRequestType & {
        _id: any;
    }>;
    deleteFriendRequest(friendRequestId: string, req: any): Promise<string>;
    acceptFriendRequest(friendRequestId: string, req: any): Promise<import("mongoose").Document<unknown, any, FriendshipType> & FriendshipType & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
