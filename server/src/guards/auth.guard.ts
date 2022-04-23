import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	Req,
} from "@nestjs/common";
import { Observable } from "rxjs";
import UsersService, {
	populateOptions,
	userSelectOptions,
} from "../services/users.service";
import * as jwt from "jsonwebtoken";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private usersService: UsersService
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get<boolean>(
			"isPublic",
			context.getHandler()
		);
		if (isPublic) return true;

		const req = context.switchToHttp().getRequest();

		const authHeader: string = req.headers?.authorization;

		if (!authHeader || !authHeader.toLocaleLowerCase().includes("bearer"))
			return false;

		const token = authHeader.split(" ")[1];

		if (!token) return false;

		const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
			id: string;
			iat: number;
			exp: number;
		};

		const user = await this.usersService.userModel
			.findById(decoded.id)
			.populate(populateOptions)
			.select(userSelectOptions);

		if (!user) return false;

		req.user = user;

		return true;
	}
}
