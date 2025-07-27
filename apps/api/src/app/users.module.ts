import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [...usersProviders, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
