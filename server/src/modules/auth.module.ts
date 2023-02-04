import { Module } from '@nestjs/common';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import FriendsModule from './friends.module';
import { UsersModule } from './users.module';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, FriendsModule],
  providers: [AuthService],
})
export default class AuthModule {}
