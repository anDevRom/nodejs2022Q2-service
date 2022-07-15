import { Album } from './albums/albums.model';
import { Artist } from './artists/artists.model';
import { Track } from './tracks/tracks.model';

export class DataBase {
  ALBUMS: Album[] = [];
  ARTISTS: Artist[] = [];
  TRACKS: Track[] = [];
}
