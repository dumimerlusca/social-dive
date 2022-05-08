import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UsersController } from '../controllers/users.controller';
import UsersService from '../services/users.service';
import FriendsModule from './friends.module';
import NotificationModule from './notifications.module';

@Module({
  imports: [forwardRef(() => FriendsModule), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule, UsersService],
})
export class UsersModule {}
