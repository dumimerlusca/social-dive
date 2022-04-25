import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserSchema, UserType } from "../schemas/user.schema";
import { Model, PopulateOptions } from "mongoose";

export const userSelectOptions = "-password -photo";
export const populateOptions: PopulateOptions[] = [];

@Injectable()
export default class UsersService {
	constructor(@InjectModel("User") public userModel: Model<UserType>) {}
	async create(user: Object) {
		return await this.userModel.create(user);
	}

	async findById(id: string, userSelectOptions?: string, populate = true) {
		return this.userModel.findById(id).select(userSelectOptions);
	}

	async find(fields: Object) {
		return this.userModel.find(fields);
	}
	async findOne(fields: Object) {
		return this.userModel.findOne(fields);
	}

	async delete(id: string) {
		return this.userModel.findByIdAndDelete(id);
	}

	async update(id: string, body: Object) {
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
