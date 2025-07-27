import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService], // 👈 export it so other modules (like UsersModule) can use it
})
export class AuthModule {}
