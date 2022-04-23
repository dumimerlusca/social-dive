/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import CommentsService from "../services/comments.service";
import { PostsService } from "../services/posts.service";
export default class CommentsController {
    private commentsService;
    private postsService;
    constructor(commentsService: CommentsService, postsService: PostsService);
    getPostComments(postId: string): Promise<Omit<import("mongoose").Document<unknown, any, import("../schemas/comment.schema").CommentType> & import("../schemas/comment.schema").Comment & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    addComment(postId: string, req: any, body: any): Promise<import("mongoose").Document<unknown, any, import("../schemas/comment.schema").CommentType> & import("../schemas/comment.schema").Comment & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editComment(commentId: string, body: any): Promise<import("mongoose").Document<unknown, any, import("../schemas/comment.schema").CommentType> & import("../schemas/comment.schema").Comment & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    likeComment(commentId: string, req: any): Promise<string>;
    unlikeComment(commentId: string, req: any): Promise<string>;
    deleteComment(commentId: string): Promise<string>;
}
