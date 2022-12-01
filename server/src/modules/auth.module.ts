import { Module } from '@nestjs/common';
import AuthController from '../controllers/auth.controller';
import FriendsModule from './friends.module';
import { UsersModule } from './users.module';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, FriendsModule],
})
export default class AuthModule {}
