import { forwardRef, Module } from '@nestjs/common';
import { DataBase } from 'src/db';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';
import { TracksService } from './tracks.service';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository, DataBase],
  exports: [TracksService],
})
export class TracksModule {}
