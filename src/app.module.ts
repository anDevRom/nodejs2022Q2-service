import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [AlbumsModule, ArtistsModule, TracksModule],
})
export class AppModule {}
