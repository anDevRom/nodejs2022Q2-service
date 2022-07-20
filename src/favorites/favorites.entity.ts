import { Album } from 'src/albums/albums.entity';
import { Artist } from 'src/artists/artists.entity';
import { Track } from 'src/tracks/tracks.entity';
import { Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ArtistsFavorites {
  @OneToOne(() => Artist, (artist) => artist.id)
  @PrimaryColumn()
  id: string;
}

@Entity()
export class AlbumsFavorites {
  @OneToOne(() => Album, (album) => album.id)
  @PrimaryColumn()
  id: string;
}

@Entity()
export class TracksFavorites {
  @OneToOne(() => Track, (track) => track.id)
  @PrimaryColumn()
  id: string;
}
