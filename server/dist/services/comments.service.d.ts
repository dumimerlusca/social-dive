import { Model, PopulateOptions } from "mongoose";
import { CommentType } from "../schemas/comment.schema";
export declare const populateOptions: PopulateOptions[];
declare class CommentsService {
    commentModel: Model<CommentType>;
    constructor(commentModel: Model<CommentType>);
    cascadeDeleteComments(postId: string): Promise<void>;
    test(): void;
}
export default CommentsService;
