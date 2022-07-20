import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './albums/albums.entity';
import { Artist } from './artists/artists.entity';
import {
  AlbumsFavorites,
  ArtistsFavorites,
  TracksFavorites,
} from './favorites/favorites.entity';
import { Track } from './tracks/tracks.entity';
import { User } from './users/users.entity';

@Module({
  imports: [
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    UsersModule,
    FavoritesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'home-collection',
      entities: [
        Album,
        Artist,
        AlbumsFavorites,
        ArtistsFavorites,
        TracksFavorites,
        Track,
        User,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
