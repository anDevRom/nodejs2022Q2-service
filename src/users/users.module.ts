import { Module } from '@nestjs/common';
import { DataBase } from 'src/db';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, DataBase],
})
export class UsersModule {}
