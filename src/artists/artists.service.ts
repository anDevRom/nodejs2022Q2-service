import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as generateId } from 'uuid';
import { Artist } from './artists.model';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistsService {
  constructor(
    private artistsRepository: ArtistsRepository,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return await this.artistsRepository.findAll();
  }

  async getOne(id: string) {
    return await this.artistsRepository.findOne(id);
  }

  async create(dto: CreateArtistDto) {
    const id = generateId();
    const entity: Artist = { id, ...dto };

    return await this.artistsRepository.create(entity);
  }

  async update(id: string, dto: UpdateArtistDto) {
    return await this.artistsRepository.update(id, dto);
  }

  async delete(id: string) {
    const isDeleted = await this.artistsRepository.delete(id);

    if (isDeleted) {
      return await Promise.all([
        this.tracksService.deleteArtistFromTracks(id),
        this.favoritesService.removeArtistFromFavorite(id),
      ]);
    }

    return isDeleted;
  }
}
