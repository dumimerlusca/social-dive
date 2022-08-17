import {
  Controller,
  Get,
  Post,
  Body,
  Injectable,
  Delete,
  Param,
  HttpException,
  Put,
  Req,
  HttpStatus,
  Res,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import UsersService, { populateOptions, userSelectOptions } from '../services/users.service';
import { IncomingForm } from 'formidable';
import * as fs from 'fs';
import { UserType } from '../schemas/user.schema';
import * as path from 'path';
import { AuthGuard } from '../guards/auth.guard';
import { Public } from '../decorators/decorators';
import FriendsService from '../services/friends.service';

@Controller('api/users')
@Injectable()
export class UsersController {
  constructor(private usersService: UsersService, private friendsService: FriendsService) {}

  @Get()
  @Public()
  @UseGuards(AuthGuard)
  async getAll(@Req() req: any, @Query('search') search: string) {
    return await this.usersService.userModel
      .find(search ? { fullName: { $regex: search } } : {})
      .select(userSelectOptions);
  }

  @Get(':id')
  async getSingle(@Param('id') id: string) {
    const user = await this.usersService.userModel
      .findById(id)
      .select(userSelectOptions)
      .populate(populateOptions);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
    return `User with id ${id} was deleted successfully`;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Object) {
    return await this.usersService.update(id, body);
  }

  @Put(':id/upload')
  async upload(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const form = new IncomingForm();
    form.parse(req, async (error: any, field: any, files: any) => {
      if (error) {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      let user: UserType;
      if (files?.photo) {
        user = await this.usersService.update(id, {
          photo: {
            data: fs.readFileSync(files.photo.filepath),
            contentType: files.photo.mimetype,
          },
        });
        if (!user) return res.status(HttpStatus.NOT_FOUND).send('User not found');
      }

      return res.status(200).json(user);
    });
  }

  @Get(':id/photo')
  @Public()
  async getPhoto(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const user = await this.usersService.findById(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user?.photo) {
      res.set('Content-Type', user.photo.contentType);
      return res.send(user.photo.data);
    }
    res.sendFile('defaultProfilePhoto.png', {
      root: path.join(__dirname, '../../public'),
    });
  }

  @Get('other/peopleYouMightKnow')
  async peopleYouMightKnow(@Req() req: any) {
    const loggedInUserId = req.user.id;
    const userFriends = (await this.friendsService.getUserFriends(
      loggedInUserId,
    )) as unknown as UserType[];
    const friendsIDsArray = userFriends.map((user) => String(user._id));
    const users = await this.usersService.userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select(userSelectOptions);

    return users.filter((user) => !friendsIDsArray.includes(String(user._id)));
  }

  // For updating all the documents, adding new fields etc
  @Post('update')
  async updateDocuments() {
    await this.usersService.userModel.updateMany(
      {},
      { friendRequestsSent: [], friendRequestsReceived: [], friends: [] },
    );
    return 'SUcces';
  }
}

type ActionType = 'accept' | 'decline';
