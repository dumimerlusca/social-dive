import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions, QueryOptions, UpdateQuery } from 'mongoose';
import { Comment, CommentType } from '../schemas/comment.schema';

export const commentPopulateOptions: PopulateOptions[] = [
  {
    path: 'user likes',
    model: 'User',
  },
];

@Injectable()
class CommentsService {
  constructor(@InjectModel('Comment') public commentModel: Model<CommentType>) {}
  create(user: Comment) {
    return this.commentModel.create(user);
  }

  findById(id: string, options?: QueryOptions) {
    return this.commentModel.findById(id, undefined, options);
  }

  find(query: FilterQuery<CommentType>, options?: QueryOptions) {
    return this.commentModel.find(query, undefined, options);
  }

  findOne(query: FilterQuery<CommentType>, options?: QueryOptions) {
    return this.commentModel.findOne(query, undefined, options);
  }

  findByIdAndDelete(id: string) {
    return this.commentModel.findByIdAndDelete(id);
  }

  findByIdAndUpdate(id: string, update: UpdateQuery<CommentType>, options?: QueryOptions) {
    return this.commentModel.findByIdAndUpdate(id, update, {
      new: options?.new ?? true,
      runValidators: options?.runValidators ?? true,
      ...options,
    });
  }

  async cascadeDeleteComments(postId: string) {
    await this.commentModel.deleteMany({ postId });
  }
}

export default CommentsService;
