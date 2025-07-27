import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users.module'; // ⬅️ Import this!

@Module({
  imports: [UsersModule], // ⬅️ Add it here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
