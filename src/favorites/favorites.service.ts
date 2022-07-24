import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import {
  AlbumsFavorites,
  ArtistsFavorites,
  TracksFavorites,
} from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(AlbumsFavorites)
    private albumsFavoritesRepository: Repository<AlbumsFavorites>,
    @InjectRepository(ArtistsFavorites)
    private artistsFavoritesRepository: Repository<ArtistsFavorites>,
    @InjectRepository(TracksFavorites)
    private tracksFavoritesRepository: Repository<TracksFavorites>,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAllFavorites() {
    const [albumsIds, artistsIds, tracksIds] = await Promise.all([
      this.albumsFavoritesRepository.find(),
      this.artistsFavoritesRepository.find(),
      this.tracksFavoritesRepository.find(),
    ]);

    const [albums, artists, tracks] = await Promise.all([
      Promise.all(albumsIds.map(({ id }) => this.albumsService.getOne(id))),
      Promise.all(artistsIds.map(({ id }) => this.artistsService.getOne(id))),
      Promise.all(tracksIds.map(({ id }) => this.tracksService.getOne(id))),
    ]);

    return { albums, artists, tracks };
  }

  async addAlbumToFavorite(id: string) {
    const album = await this.albumsService.getOne(id);

    if (!album) {
      return;
    }

    return await this.albumsFavoritesRepository.save({ id });
  }

  async addArtistToFavorite(id: string) {
    const artist = await this.artistsService.getOne(id);

    if (!artist) {
      return;
    }

    return await this.artistsFavoritesRepository.save({ id });
  }

  async addTrackToFavorite(id: string) {
    const track = await this.tracksService.getOne(id);

    if (!track) {
      return;
    }

    return await this.tracksFavoritesRepository.save({ id });
  }

  async removeAlbumFromFavorite(id: string) {
    const { affected: isDeleted } = await this.albumsFavoritesRepository.delete(
      id,
    );

    return isDeleted;
  }

  async removeArtistFromFavorite(id: string) {
    const { affected: isDeleted } =
      await this.artistsFavoritesRepository.delete(id);

    return isDeleted;
  }

  async removeTrackFromFavorite(id: string) {
    const { affected: isDeleted } = await this.tracksFavoritesRepository.delete(
      id,
    );

    return isDeleted;
  }
}
