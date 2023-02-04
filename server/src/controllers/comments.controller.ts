import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { NotificationTypeEnum } from '../schemas/notificationTypes';
import CommentsService, { commentPopulateOptions } from '../services/comments.service';
import NotificationService from '../services/notifications.service';
import { postPopulateOptions, PostsService } from '../services/posts.service';

@Controller('api/comments')
export default class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService,
    private notificationsService: NotificationService,
  ) {}

  @Get('post/:postId')
  async getPostComments(@Param('postId') postId: string) {
    const post = await this.postsService.findById(postId, { populate: postPopulateOptions });
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return await this.commentsService.find(
      { postId: postId },
      { sort: { createdAt: -1 }, populate: commentPopulateOptions },
    );
  }

  @Post('post/:postId/addComment')
  async addComment(@Param('postId') postId: string, @Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    const post = await this.postsService.findById(postId, { populate: postPopulateOptions });

    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const comment = await this.commentsService.create({
      ...body,
      postId,
      user: userId,
    });

    const isPostAuthor = userId === String(post.user);
    if (!isPostAuthor) {
      this.notificationsService.sendPostNotificationToUser(
        userId,
        post.user,
        post.id,
        NotificationTypeEnum.postCommentAdded,
      );
    }

    return await comment.populate(commentPopulateOptions);
  }

  @Patch(':commentId')
  async editComment(@Param('commentId') commentId: string, @Body() body: any) {
    return await this.commentsService.findByIdAndUpdate(commentId, body);
  }

  @Patch(':commentId/like')
  async likeComment(@Param('commentId') commentId: string, @Req() req: any) {
    const userId = req.user.id;
    const comment = await this.commentsService.findById(commentId);
    if (comment.likes.includes(userId))
      throw new HttpException('Comment is already liked', HttpStatus.BAD_REQUEST);

    await comment.updateOne({ $push: { likes: userId } });

    const isCommentAuthor = userId === String(comment.user);

    if (!isCommentAuthor) {
      this.notificationsService.sendPostNotificationToUser(
        userId,
        comment.user,
        String(comment.postId),
        NotificationTypeEnum.postCommentLiked,
      );
    }

    return 'Comment liked successfuly';
  }

  @Patch(':commentId/unlike')
  async unlikeComment(@Param('commentId') commentId: string, @Req() req: any) {
    const userId = req.user.id;
    const comment = await this.commentsService.findById(commentId);
    if (!comment.likes.includes(userId))
      throw new HttpException('Comment is not liked', HttpStatus.BAD_REQUEST);

    await comment.updateOne({ $pull: { likes: userId } });
    return 'Comment unliked successfuly';
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    await this.commentsService.findByIdAndDelete(commentId);
    return 'Comment deleted successfully';
  }
}
