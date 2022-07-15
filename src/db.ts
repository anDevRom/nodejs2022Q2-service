import { Album } from './albums/albums.model';
import { Artist } from './artists/artists.model';
import { Track } from './tracks/tracks.model';
import { User } from './users/users.model';

export class DataBase {
  ALBUMS: Album[] = [];
  ARTISTS: Artist[] = [];
  TRACKS: Track[] = [];
  USERS: User[] = [];
}
