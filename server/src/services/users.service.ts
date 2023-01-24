import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { User, UserType } from '../schemas/user.schema';

@Injectable()
export default class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserType>) {}
  create(user: User) {
    return this.userModel.create(user);
  }

  findById(id: string, options?: QueryOptions) {
    return this.userModel.findById(id, undefined, options);
  }

  find(query: FilterQuery<UserType>, options?: QueryOptions) {
    return this.userModel.find(query, undefined, options);
  }

  findOne(query: FilterQuery<UserType>, options?: QueryOptions) {
    return this.userModel.findOne(query, undefined, options);
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  findByIdAndUpdate(id: string, update: UpdateQuery<UserType>, options?: QueryOptions) {
    return this.userModel.findByIdAndUpdate(id, update, {
      new: options?.new ?? true,
      runValidators: options?.runValidators ?? true,
      ...options,
    });
  }

  validate(body: any) {
    return this.userModel.validate(body);
  }

  makeUserActive(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      isActive: true,
      lastActive: new Date(Date.now()),
    });
  }
  makeUserInactive(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      isActive: false,
      lastActive: new Date(Date.now()),
    });
  }
}
