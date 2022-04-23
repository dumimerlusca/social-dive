import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostType } from "../schemas/post.schema";
import { Model, PopulateOptions } from "mongoose";
import CommentsService from "./comments.service";

export const populateOptions: PopulateOptions[] = [
	{
		path: "user",
		model: "User",
		select: "-photo -password",
	},
	{
		path: "likes",
		model: "User",
		select: "-password",
	},
];

export const selectOptions = "-photo";

@Injectable()
export class PostsService {
	constructor(@InjectModel("Post") public postModel: Model<PostType>) {}

	async create(post: any) {
		return (await this.postModel.create(post))?.populate(populateOptions);
	}

	async findAll() {
		return await this.postModel
			.find({})
			.populate(populateOptions)
			.select(selectOptions);
	}
	async find(query: Object) {
		return await this.postModel
			.find(query)
			.populate(populateOptions)
			.select(selectOptions);
	}

	async findById(id: string) {
		return await this.postModel.findById(id).populate(populateOptions);
	}

	async findOneAndUpdate(query: Object, body: Object) {
		return await this.postModel
			.findOneAndUpdate(query, body, {
				new: true,
				runValidators: true,
			})
			.populate(populateOptions)
			.select(selectOptions);
	}
	async findByIdAndUpdate(query: Object, body: Object) {
		return await this.postModel
			.findByIdAndUpdate(query, body, {
				new: true,
				runValidators: true,
			})
			.populate(populateOptions)
			.select(selectOptions);
	}

	async update(query: Object, body: Object) {
		return await this.postModel
			.findOneAndUpdate({ query }, body, {
				new: true,
				runValidators: true,
			})
			.populate(populateOptions)
			.select(selectOptions);
	}

	async updateById(id: string, body: Object) {
		return await this.postModel
			.findByIdAndUpdate(id, body, {
				new: true,
				runValidators: true,
			})
			.populate(populateOptions)
			.select(selectOptions);
	}

	async delete(id: string) {
		return await this.postModel.findByIdAndDelete(id);
	}
}
