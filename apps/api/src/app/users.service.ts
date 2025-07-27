import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  Req,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RegistrationType, User } from '@penny/shared-validation';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private readonly authService: AuthService
  ) {}

  async create(createUserDto: RegistrationType) {
    const createdUser = new this.userModel(createUserDto);
    const newPass = await this.authService.hashPassword(createUserDto.password);
    createdUser.password = newPass;
    const user = await createdUser.save();
    return user;
  }

  async findAll(@Req() req: Request): Promise<User[]> {
    if (!req.session.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
