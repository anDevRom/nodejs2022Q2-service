import { Module } from '@nestjs/common';
import { DataBase } from 'src/db';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository, DataBase],
})
export class AlbumsModule {}
