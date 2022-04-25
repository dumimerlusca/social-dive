import { PostType } from "../schemas/post.schema";
import { Model } from "mongoose";
import { PostsService } from "../services/posts.service";
import { Request, Response } from "express";
import UsersService from "../services/users.service";
import FriendsService from "../services/friends.service";
export default class PostsController {
    private postModel;
    private usersService;
    private postsService;
    private friendsService;
    constructor(postModel: Model<PostType>, usersService: UsersService, postsService: PostsService, friendsService: FriendsService);
    create(req: Request, res: Response): Promise<void>;
    getNewsfeedPosts(req: any): Promise<Omit<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getAll(userId: string): Promise<Omit<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getSingle(id: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    updatePost(id: string, body: any): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getPhoto(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: string, req: any): Promise<string>;
    likePost(id: string, req: any): Promise<string>;
    unlikePost(id: string, req: any): Promise<string>;
    updateDocuments(): Promise<string>;
}
