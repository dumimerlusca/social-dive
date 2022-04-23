import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	HttpStatus,
	Injectable,
	Post,
	Req,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserType } from "../schemas/user.schema";
import { Model } from "mongoose";
import UsersService, {
	populateOptions,
	userSelectOptions,
} from "../services/users.service";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { MongoError } from "mongodb";
import { Public } from "../decorators/decorators";

@Controller("/api/auth")
@Injectable()
export default class AuthController {
	constructor(
		@InjectModel("User") private userModer: Model<UserType>,
		private usersService: UsersService
	) {}
	@Post("login")
	@Public()
	async login(@Body() body: { email: string; password: string }) {
		const user = await this.usersService.userModel
			.findOne({ email: body.email })
			.select("-photo")
			.populate(populateOptions);

		if (!user)
			throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);

		const isValidPassword = await bcrypt.compare(body.password, user.password);
		if (!isValidPassword)
			throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});

		return {
			token,
			user: { ...user.toObject(), password: null },
		};
	}

	@Post("register")
	@Public()
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() body: any) {
		try {
			await this.usersService.validate(body);
		} catch (error: any) {
			throw new MongoError(error);
		}
		body.password = await bcrypt.hash(body.password, 10);
		const user = await this.usersService.create(body);
		return user;
	}

	@Post("user")
	async loadUser(@Req() req: any) {
		const user = req.user;
		return user;
	}
}
