import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
export declare class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): Response<any, Record<string, any>>;
}
