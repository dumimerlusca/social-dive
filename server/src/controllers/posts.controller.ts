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
import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import * as sharp from 'sharp';
import { Public } from '../decorators/decorators';
import { getAdvanceResults } from '../helpers';
import { NotificationTypeEnum } from '../schemas/notificationTypes';
import FriendsService from '../services/friends.service';
import NotificationService from '../services/notifications.service';
import { PhotosService } from '../services/photos.service';
import { postPopulateOptions, PostsService } from '../services/posts.service';

@Controller('api/posts')
@Injectable()
export default class PostsController {
  constructor(
    private postsService: PostsService,
    private friendsService: FriendsService,
    private notificationService: NotificationService,
    private photosService: PhotosService,
  ) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    const user = (req as any).user;
    const contentType = req.header('content-type');
    if (!contentType.includes('multipart/form-data'))
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    try {
      return await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (error: any, fields: any, files: any) => {
          if (error) {
            return reject(new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
          }

          if (!fields.description && !files.photo) {
            return reject(
              new HttpException(
                'The post needs a description or a photo, or both',
                HttpStatus.BAD_REQUEST,
              ),
            );
          }

          const post = { ...fields, user: user.id };

          let createdPost;

          if (files.photo) {
            const transformedPhoto = sharp(files.photo.filepath);
            let finalPhoto: Buffer;

            const metadata = await transformedPhoto.metadata();

            if (metadata.width > 1024) {
              finalPhoto = await transformedPhoto.resize({ width: 1024 }).toBuffer();
            } else {
              finalPhoto = await transformedPhoto.toBuffer();
            }

            const photo = await this.photosService.create({
              data: finalPhoto,
              contentType: files.photo.mimetype,
            });

            createdPost = await (
              await this.postsService.create({ ...post, photo: photo._id })
            ).populate('user');
          } else {
            createdPost = (await this.postsService.create(post)).populate('user');
          }

          this.notificationService.sendPostNotificationToFriends(
            user.id,
            createdPost.id,
            NotificationTypeEnum.postCreate,
          );
          resolve(res.status(HttpStatus.CREATED).json(createdPost));
        });
      });
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('newsfeed')
  async getNewsfeedPosts(
    @Req() req: any,
    @Query('limit') limitQ: number,
    @Query('page') page: number,
  ) {
    const limit = limitQ ?? 2;
    const userId = req.user.id;
    const friends = await this.friendsService.getUserFriends(userId);

    const query = { $or: [{ user: { $in: friends } }, { user: userId }] };

    return getAdvanceResults(
      this.postsService.getPostModel(),
      query,
      page,
      limit,
      postPopulateOptions,
      undefined,
      {
        createdAt: -1,
      },
    );
  }

  @Get()
  async getAll(@Query('user') userId: string) {
    return this.postsService.getAllPostsOfSingleUser(userId);
  }

  @Get(':id')
  async getSingle(@Param('id') id: string) {
    const post = await this.postsService.findById(id, { populate: postPopulateOptions });
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return post;
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() body: any) {
    const post = await this.postsService.findByIdAndUpdate(id, body, {
      populate: postPopulateOptions,
    });
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return post;
  }

  @Get(':id/photo')
  @Public()
  async getPhoto(@Param('id') id: string, @Res() res: Response) {
    const post = await this.postsService.findById(id, { projection: 'photo' });
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    if (!post.photo) throw new HttpException('No photo found', HttpStatus.NOT_FOUND);

    const photo = await this.photosService.findById(post.photo);

    res.set('Content-Type', photo.contentType);
    return res.send(photo.data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const loggedInUser = req.user;
    const post = await this.postsService.findById(id);
    if (post.user.toString() !== loggedInUser.id)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    await post.remove();
    return 'Post deleted';
  }

  @Patch(':id/like')
  async likePost(@Param('id') postId: string, @Req() req: any) {
    const user = req.user;
    const post = await this.postsService.findById(postId, { projection: 'likes user' });
    if (!post) throw new HttpException('No photo found', HttpStatus.NOT_FOUND);

    if (post.likes.includes(user.id))
      throw new HttpException('Post is liked already', HttpStatus.BAD_REQUEST);
    await post.updateOne(
      {
        $push: { likes: user.id },
      },
      { runValidators: true },
    );

    const isPostCreator = user.id === String(post.user);
    if (!isPostCreator) {
      this.notificationService.sendPostNotificationToUser(
        user.id,
        post.user,
        post.id,
        NotificationTypeEnum.postLike,
      );
    }

    return 'Post liked successfully';
  }

  @Patch(':id/unlike')
  async unlikePost(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    const post = await this.postsService.findById(id, { projection: 'likes' });
    if (!post) throw new HttpException('No photo found', HttpStatus.NOT_FOUND);

    if (!post.likes.includes(user.id))
      throw new HttpException('Post is not liked', HttpStatus.BAD_REQUEST);

    await post.updateOne(
      {
        $pull: { likes: user.id },
      },
      { runValidators: true },
    );
    return 'Post unliked successfully';
  }
}
