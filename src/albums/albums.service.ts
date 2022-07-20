import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as generateId } from 'uuid';
import { Album } from './albums.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return await this.albumsRepository.find();
  }

  async getOne(id: string) {
    return await this.albumsRepository.findOneBy({ id });
  }

  async create(dto: CreateAlbumDto) {
    const id = generateId();
    const entity: Album = { id, ...dto };

    return await this.albumsRepository.save(entity);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    return await this.albumsRepository
      .createQueryBuilder()
      .update(Album)
      .set(dto)
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((r) => r.raw[0]);
  }

  async delete(id: string) {
    const { affected: isDeleted } = await this.albumsRepository.delete(id);

    if (isDeleted) {
      return await Promise.all([
        this.tracksService.deleteAlbumFromTracks(id),
        this.favoritesService.removeAlbumFromFavorite(id),
      ]);
    }

    return isDeleted;
  }
}
