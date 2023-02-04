import { Body, Controller, Get, HttpCode, HttpStatus, Injectable, Post, Req } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { MongoError } from 'mongodb';
import { Public } from '../decorators/decorators';
import AuthService from '../services/auth.service';
import FriendsService from '../services/friends.service';
import UsersService from '../services/users.service';

@Controller('/api/auth')
@Injectable()
export default class AuthController {
  constructor(
    private usersService: UsersService,
    private friendsService: FriendsService,
    private authService: AuthService,
  ) {}
  @Post('login')
  @Public()
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login(body.email, body.password);
  }

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: any) {
    try {
      await this.usersService.validate(body);
    } catch (error: any) {
      throw new MongoError(error);
    }
    body.password = await bcrypt.hash(body.password, 10);
    const user = await this.usersService.create(body);
    this.friendsService.createFriendshipWithAdmin(user.id);

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return { token, user: { ...user.toObject(), password: null } };
  }

  @Post('user')
  async loadUser(@Req() req: any) {
    const user = req.user;
    return user;
  }

  @Get('login-cypress')
  @Public() // TODO Make admin only
  loginCypress() {
    return this.authService.getLoginTokenForCypressAccount();
  }
}
