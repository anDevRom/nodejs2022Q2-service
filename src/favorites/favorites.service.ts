import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAllFavorites() {
    const [albums, artists, tracks] = await Promise.all([
      this.getAlbumsFavorites(),
      this.getArtistsFavorites(),
      this.getTracksFavorites(),
    ]);

    return { artists, albums, tracks };
  }

  async getAlbumsFavorites() {
    const ids = await this.favoritesRepository.findAll('albums');

    return await Promise.all(ids.map((id) => this.albumsService.getOne(id)));
  }

  async getArtistsFavorites() {
    const ids = await this.favoritesRepository.findAll('artists');

    return await Promise.all(ids.map((id) => this.artistsService.getOne(id)));
  }

  async getTracksFavorites() {
    const ids = await this.favoritesRepository.findAll('tracks');

    return await Promise.all(ids.map((id) => this.tracksService.getOne(id)));
  }

  async addAlbumToFavorite(id: string) {
    const album = await this.albumsService.getOne(id);

    if (!album) {
      return 'Not found';
    }

    await this.favoritesRepository.create('albums', id);
  }

  async addArtistToFavorite(id: string) {
    const artist = await this.artistsService.getOne(id);

    if (!artist) {
      return 'Not found';
    }

    await this.favoritesRepository.create('artists', id);
  }

  async addTrackToFavorite(id: string) {
    const track = await this.tracksService.getOne(id);

    if (!track) {
      return 'Not found';
    }

    await this.favoritesRepository.create('tracks', id);
  }

  async removeAlbumFromFavorite(id: string) {
    return await this.favoritesRepository.delete('albums', id);
  }

  async removeArtistFromFavorite(id: string) {
    return await this.favoritesRepository.delete('artists', id);
  }

  async removeTrackFromFavorite(id: string) {
    return await this.favoritesRepository.delete('tracks', id);
  }
}
