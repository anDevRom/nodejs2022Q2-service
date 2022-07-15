import { Module } from '@nestjs/common';
import { DataBase } from 'src/db';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepository, DataBase],
})
export class TracksModule {}
