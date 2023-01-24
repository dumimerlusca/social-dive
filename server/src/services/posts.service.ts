import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions, QueryOptions, UpdateQuery } from 'mongoose';
import { Post, PostType } from '../schemas/post.schema';

export const postPopulateOptions: PopulateOptions[] = [
  {
    path: 'user',
    model: 'User',
  },
  {
    path: 'likes',
    model: 'User',
  },
];

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private postModel: Model<PostType>) {}

  create(post: Post) {
    return this.postModel.create(post);
  }

  find(query: FilterQuery<PostType>, options?: QueryOptions) {
    return this.postModel.find(query, undefined, options);
  }

  findById(id: string, options?: QueryOptions) {
    return this.postModel.findById(id, undefined, options);
  }

  findByIdAndUpdate(id: string, update: UpdateQuery<PostType>, options?: QueryOptions) {
    return this.postModel.findByIdAndUpdate(id, update, {
      new: options?.new ?? true,
      runValidators: options?.runValidators ?? true,
      ...options,
    });
  }

  delete(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }

  async getAllPostsOfSingleUser(userId: string) {
    const values = await this.postModel
      .find({ user: userId })
      .populate(postPopulateOptions)
      .lean()
      .sort({ createdAt: -1 });
    return values.map((value) => ({ ...value, photo: !!value.photo }));
  }

  getPostModel() {
    return this.postModel;
  }
}
