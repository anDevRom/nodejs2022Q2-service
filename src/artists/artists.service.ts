import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './artists.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return await this.artistsRepository.find();
  }

  async getOne(id: string) {
    return await this.artistsRepository.findOneBy({ id });
  }

  async create(dto: CreateArtistDto) {
    return await this.artistsRepository.save(dto);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const {
      raw: [updated],
    } = await this.artistsRepository
      .createQueryBuilder()
      .update(Artist)
      .set(dto)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return updated;
  }

  async delete(id: string) {
    const { affected: isDeleted } = await this.artistsRepository.delete(id);

    if (isDeleted) {
      return await Promise.all([
        this.tracksService.deleteArtistFromTracks(id),
        this.favoritesService.removeArtistFromFavorite(id),
      ]);
    }

    return isDeleted;
  }
}
