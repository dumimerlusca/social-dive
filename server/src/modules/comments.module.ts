import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CommentsController from '../controllers/comments.controller';
import { CommentSchema } from '../schemas/comment.schema';
import CommentsService from '../services/comments.service';
import NotificationModule from './notifications.module';
import PostsModule from './posts.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule,
    NotificationModule,
    forwardRef(() => PostsModule),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [MongooseModule, CommentsService],
})
export default class CommentsModule {}
