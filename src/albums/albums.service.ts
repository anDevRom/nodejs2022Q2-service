import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as generateId } from 'uuid';
import { Album } from './albums.model';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    private albumsRepository: AlbumsRepository,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return await this.albumsRepository.findAll();
  }

  async getOne(id: string) {
    return await this.albumsRepository.findOne(id);
  }

  async create(dto: CreateAlbumDto) {
    const id = generateId();
    const entity: Album = { id, ...dto };

    return await this.albumsRepository.create(entity);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    return await this.albumsRepository.update(id, dto);
  }

  async delete(id: string) {
    const isDeleted = await this.albumsRepository.delete(id);

    if (isDeleted) {
      return await Promise.all([
        this.tracksService.deleteAlbumFromTracks(id),
        this.favoritesService.removeAlbumFromFavorite(id),
      ]);
    }

    return isDeleted;
  }
}
