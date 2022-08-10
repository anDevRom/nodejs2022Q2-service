import { Album } from '../albums/albums.entity';
import { Artist } from '../artists/artists.entity';
import { Track } from '../tracks/tracks.entity';
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
