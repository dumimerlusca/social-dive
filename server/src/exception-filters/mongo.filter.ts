import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";
import { Response, Request } from "express";

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const status = exception?.status ?? 500;

		const message = getErrorMessage(exception);

		const name = exception?.name ?? "Error";
		const errorCode = exception?.code ?? "default";

		if (name === "CastError")
			return response.status(HttpStatus.BAD_REQUEST).json({
				statusCode: HttpStatus.BAD_REQUEST,
				message: message,
			});

		if (errorCode === 11000)
			return response.status(HttpStatus.BAD_REQUEST).json({
				statusCode: HttpStatus.BAD_REQUEST,
				message: "Duplicate fields",
			});

		return response.status(status).json({
			statusCode: status,
			message: message,
		});
	}
}

function getErrorMessage(exception: any) {
	if (exception?.message) return exception.message;
	if (typeof exception.response === "string") return exception.response;
	if (exception.response.message) return exception.response.message;
	return "Internal server error";
}
