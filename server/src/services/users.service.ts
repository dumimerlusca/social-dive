import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';
import { UserType } from '../schemas/user.schema';

export const userSelectOptions = '-password -photo';
export const populateOptions: PopulateOptions[] = [];

@Injectable()
export default class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserType>) {}
  async create(user: Object) {
    return await this.userModel.create(user);
  }

  findById(id: string, select = userSelectOptions, populate = populateOptions) {
    return this.userModel.findById(id).select(select).populate(populate);
  }

  find(fields: Object, select = userSelectOptions) {
    return this.userModel.find(fields).select(select);
  }
  findOne(fields: Object, select = userSelectOptions) {
    return this.userModel.findOne(fields).select(select);
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  update(id: string, body: Object) {
    return this.userModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
  }

  async validate(body: any) {
    return this.userModel.validate(body);
  }

  async makeUserActive(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      isActive: true,
      lastActive: new Date(Date.now()),
    });
  }
  async makeUserInactive(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      isActive: false,
      lastActive: new Date(Date.now()),
    });
  }
}
