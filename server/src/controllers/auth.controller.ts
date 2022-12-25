import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  Req,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { MongoError } from 'mongodb';
import { Public } from '../decorators/decorators';
import FriendsService from '../services/friends.service';
import UsersService from '../services/users.service';

@Controller('/api/auth')
@Injectable()
export default class AuthController {
  constructor(private usersService: UsersService, private friendsService: FriendsService) {}
  @Post('login')
  @Public()
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.findOne({ email: body.email }, '');
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return {
      token,
      user: { ...user.toObject(), password: null },
    };
  }

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: any) {
    console.log('REGISTERINGG');
    try {
      await this.usersService.validate(body);
    } catch (error: any) {
      throw new MongoError(error);
    }
    body.password = await bcrypt.hash(body.password, 10);
    const user = await this.usersService.create(body);
    console.log('Hello');
    this.friendsService.createFriendshipWithAdmin(user.id);
    return user;
  }

  @Post('user')
  async loadUser(@Req() req: any) {
    const user = req.user;
    return user;
  }
}
