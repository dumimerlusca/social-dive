import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controllers/users.controller';
import { UserSchema } from '../schemas/user.schema';
import UsersService from '../services/users.service';
import FriendsModule from './friends.module';
import { PhotosModule } from './photos.module';

@Module({
  imports: [
    PhotosModule,
    forwardRef(() => FriendsModule),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule, UsersService],
})
export class UsersModule {}
