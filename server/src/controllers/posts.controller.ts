import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostType } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { populateOptions, PostsService, selectOptions } from '../services/posts.service';
import { IncomingForm } from 'formidable';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { UserType } from '../schemas/user.schema';
import UsersService from '../services/users.service';
import { Public } from '../decorators/decorators';
import FriendsService from '../services/friends.service';
import NotificationService from '../services/notifications.service';
import { NotificationTypeEnum } from '../schemas/notificationTypes';

@Controller('api/posts')
@Injectable()
export default class PostsController {
  constructor(
    @InjectModel('Post') private postModel: Model<PostType>,
    private usersService: UsersService,
    private postsService: PostsService,
    private friendsService: FriendsService,
    private notificationService: NotificationService,
  ) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    const user = (req as any).user;
    const contentType = req.header('content-type');
    if (!contentType.includes('multipart/form-data')) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

    const form = new IncomingForm();

    form.parse(req, async (error: any, fields: any, files: any) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Server error',
        });
      }

      if (!fields.description && !files.photo) {
        return res.status(400).json({
          statusCode: 400,
          message: 'The post needs a description or a photo, or both',
        });
      }

      const post = { ...fields, user: user.id };

      if (files.photo) {
        post.photo = {
          data: fs.readFileSync(files.photo.filepath),
          contentType: files.photo.mimetype,
        };
      }

      const createdPost = await this.postsService.create(post);
      this.notificationService.sendPostNotificationToFriends(user.id, createdPost.id, NotificationTypeEnum.postCreate);
      res.status(HttpStatus.CREATED).json(createdPost);
    });
  }

  @Get('newsfeed')
  async getNewsfeedPosts(@Req() req: any, @Query('limit') limitQ: number, @Query('page') page: number) {
    const limit = limitQ ?? 5;
    const userId = req.user.id;
    const friends = await this.friendsService.getUserFriends(userId);
    return await this.postsService.postModel
      .find({ $or: [{ user: { $in: friends } }, { user: userId }] })
      .sort({ createdAt: -1 })
      .populate(populateOptions)
      .skip((page - 1) * limit)
      .limit(limit);
  }

  @Get()
  async getAll(@Query('user') userId: string) {
    if (!userId) return await this.postsService.postModel.find({}).populate(populateOptions).sort({ createdAt: -1 });
    return await this.postsService.postModel.find({ user: userId }).populate(populateOptions).sort({ createdAt: -1 });
  }

  @Get(':id')
  async getSingle(@Param('id') id: string) {
    const post = await this.postsService.postModel.findById(id).populate(populateOptions).select('-photo');
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return post;
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() body: any) {
    const post = await this.postsService.updateById(id, body);
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return post;
  }

  @Get(':id/photo')
  @Public()
  async getPhoto(@Param('id') id: string, @Res() res: Response) {
    const post = await this.postsService.findById(id);
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    if (!post.photo) throw new HttpException('No photo found', HttpStatus.NOT_FOUND);

    res.set('Content-Type', post.photo.contentType);
    return res.send(post.photo.data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const loggedInUser = req.user;
    const post = await this.postsService.postModel.findById(id);
    if (post.user.toString() !== loggedInUser.id) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    await post.remove();
    return 'Post deleted';
  }

  @Patch(':id/like')
  async likePost(@Param('id') postId: string, @Req() req: any) {
    const user = req.user;
    const post = await this.postModel.findById(postId).select(selectOptions);
    if (!post) throw new HttpException('No photo found', HttpStatus.NOT_FOUND);

    if (post.likes.includes(user.id)) throw new HttpException('Post is liked already', HttpStatus.BAD_REQUEST);
    await post.updateOne(
      {
        $push: { likes: user.id },
      },
      { runValidators: true },
    );

    const isPostCreator = user.id === String(post.user);
    if (!isPostCreator) {
      this.notificationService.sendPostNotificationToUser(user.id, post.user, post.id, NotificationTypeEnum.postLike);
    }

    return 'Post liked successfully';
  }

  @Patch(':id/unlike')
  async unlikePost(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    let post = await this.postModel.findById(id).select(selectOptions);
    if (!post) throw new HttpException('No photo found', HttpStatus.NOT_FOUND);

    if (!post.likes.includes(user.id)) throw new HttpException('Post is not liked', HttpStatus.BAD_REQUEST);

    await post.updateOne(
      {
        $pull: { likes: user.id },
      },
      { runValidators: true },
    );
    return 'Post unliked successfully';
  }

  @Post('update')
  async updateDocuments() {
    await this.postsService.postModel.deleteMany({});
    return 'Posts updated';
  }
}
