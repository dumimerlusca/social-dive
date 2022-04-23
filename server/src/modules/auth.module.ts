import { Module } from "@nestjs/common";
import AuthController from "../controllers/auth.controller";
import { UsersModule } from "./users.module";

@Module({
	controllers: [AuthController],
	imports: [UsersModule],
})
export default class AuthModule {}
