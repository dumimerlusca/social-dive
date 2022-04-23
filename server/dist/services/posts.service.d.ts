import { PostType } from "../schemas/post.schema";
import { Model, PopulateOptions } from "mongoose";
export declare const populateOptions: PopulateOptions[];
export declare const selectOptions = "-photo";
export declare class PostsService {
    postModel: Model<PostType>;
    constructor(postModel: Model<PostType>);
    create(post: any): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<Omit<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    find(query: Object): Promise<Omit<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    findById(id: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findOneAndUpdate(query: Object, body: Object): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findByIdAndUpdate(query: Object, body: Object): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update(query: Object, body: Object): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    updateById(id: string, body: Object): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete(id: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
