import { forwardRef, Module } from '@nestjs/common';
import { DataBase } from 'src/db';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { ArtistsService } from './artists.service';

@Module({
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository, DataBase],
  exports: [ArtistsService],
})
export class ArtistsModule {}
