/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { UserType } from "../schemas/user.schema";
import { Model, PopulateOptions } from "mongoose";
export declare const userSelectOptions = "-password -photo";
export declare const populateOptions: PopulateOptions[];
export default class UsersService {
    userModel: Model<UserType>;
    constructor(userModel: Model<UserType>);
    create(user: Object): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findById(id: string, userSelectOptions?: string, populate?: boolean): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    find(fields: Object): Promise<(import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    findOne(fields: Object): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete(id: string): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update(id: string, body: Object): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    validate(body: any): Promise<void>;
    makeUserActive(userId: string): Promise<void>;
    makeUserInactive(userId: string): Promise<void>;
}
