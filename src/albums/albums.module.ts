import { forwardRef, Module } from '@nestjs/common';
import { DataBase } from 'src/db';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';

@Module({
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository, DataBase],
  exports: [AlbumsService],
})
export class AlbumsModule {}
