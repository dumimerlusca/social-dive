import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UsersService from './users.service';

@Injectable()
export default class AuthService {
  constructor(private userService: UsersService) {}

  async login(email: string, password: string) {
    const user = await this.userService.findOne({ email: email }, { projection: '+password' });
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return {
      token,
      user: { ...user.toObject(), password: null },
    };
  }
  register() {}
  loadUser() {}
  getLoginTokenForCypressAccount() {
    const token = sign({ id: process.env.CYPRESS_ACCOUNT_ID }, process.env.JWT_SECRET);
    return token;
  }
}
