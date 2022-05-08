import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import CommentsService, { populateOptions } from '../services/comments.service';
import { PostsService } from '../services/posts.service';
import NotificationService from '../services/notifications.service';
import { NotificationTypeEnum } from '../schemas/notificationTypes';

@Controller('api/comments')
export default class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService,
    private notificationsService: NotificationService,
  ) {}

  @Get('post/:postId')
  async getPostComments(@Param('postId') postId: string) {
    const post = await this.postsService.postModel.findById(postId);
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return await this.commentsService.commentModel
      .find({ postId: postId })
      .sort({ createdAt: -1 })
      .populate(populateOptions);
  }

  @Post('post/:postId/addComment')
  async addComment(@Param('postId') postId: string, @Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    const post = await this.postsService.postModel.findById(postId);

    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const comment = await this.commentsService.commentModel.create({
      ...body,
      postId,
      user: userId,
    });
    this.notificationsService.sendPostNotificationToUser(
      userId,
      post.user,
      post.id,
      NotificationTypeEnum.postCommentAdded,
    );
    return await comment.populate(populateOptions);
  }

  @Patch(':commentId')
  async editComment(@Param('commentId') commentId: string, @Body() body: any) {
    return await this.commentsService.commentModel.findByIdAndUpdate(commentId, body, {
      new: true,
      runValidators: true,
    });
  }

  @Patch(':commentId/like')
  async likeComment(@Param('commentId') commentId: string, @Req() req: any) {
    const userId = req.user.id;
    const comment = await this.commentsService.commentModel.findById(commentId);
    if (comment.likes.includes(userId)) throw new HttpException('Comment is already liked', HttpStatus.BAD_REQUEST);

    await comment.updateOne({ $push: { likes: userId } });
    return 'Comment liked successfuly';
  }

  @Patch(':commentId/unlike')
  async unlikeComment(@Param('commentId') commentId: string, @Req() req: any) {
    const userId = req.user.id;
    const comment = await this.commentsService.commentModel.findById(commentId);
    if (!comment.likes.includes(userId)) throw new HttpException('Comment is not liked', HttpStatus.BAD_REQUEST);

    await comment.updateOne({ $pull: { likes: userId } });
    return 'Comment unliked successfuly';
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    await this.commentsService.commentModel.findByIdAndDelete(commentId);
    return 'Comment deleted successfully';
  }
}
