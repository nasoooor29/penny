import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  loginSchema,
  LoginType,
  registrationSchema,
  RegistrationType,
} from '@penny/shared-validation';
import { ZodValidationPipe } from '../pipes/zod';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SessionGuard } from './session.guard';

let lastdata: any = null;
@Controller('auth')
export class UsersController {
  // this controller will handle authentication-related routes
  // you can add methods here to handle login, registration, etc.

  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Req() req: Request, @Body() body: LoginType) {
    const user = await this.userService.findByUsername(body.username);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await this.authService.comparePasswords(
      body.password,
      user.password
    );
    if (!isMatch) throw new UnauthorizedException('Invalid password');
    req.session.user = user;
    return user;
  }
  @Post('register')
  @UsePipes(new ZodValidationPipe(registrationSchema)) // Assuming you have a registration schema
  async register(@Req() req: Request, @Body() body: RegistrationType) {
    try {
      const user = await this.userService.create(body);
      req.session.user = user;
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  @UseGuards(SessionGuard)
  @Get('me')
  async me(@Req() req: Request) {
    if (!req.session.user)
      throw new UnauthorizedException('User not authenticated');
    const { password, ...safeUser } = req.session.user;
    return safeUser;
  }
}
