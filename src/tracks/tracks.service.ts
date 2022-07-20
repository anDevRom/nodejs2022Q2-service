import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './tracks.entity';
import { UpdateTrackDto } from './dto/update-track';
import { FavoritesService } from 'src/favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return await this.tracksRepository.find();
  }

  async getOne(id: string) {
    return await this.tracksRepository.findOneBy({ id });
  }

  async create(dto: CreateTrackDto) {
    return await this.tracksRepository.save(dto);
  }

  async update(id: string, dto: UpdateTrackDto) {
    return await this.tracksRepository
      .createQueryBuilder()
      .update(Track)
      .set(dto)
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((r) => r.raw[0]);
  }

  async delete(id: string) {
    const { affected: isDeleted } = await this.tracksRepository.delete(id);

    if (isDeleted) {
      return await Promise.all([
        this.tracksRepository.delete(id),
        this.favoritesService.removeTrackFromFavorite(id),
      ]);
    }

    return isDeleted;
  }

  async deleteAlbumFromTracks(id: string) {
    const tracks = await this.getAll();

    await Promise.all(
      tracks.reduce((acc, track) => {
        if (track.albumId === id) {
          acc.push(this.update(track.id, { ...track, albumId: null }));
        }
        return acc;
      }, []),
    );
  }

  async deleteArtistFromTracks(id: string) {
    const tracks = await this.getAll();

    await Promise.all([
      ...tracks.reduce((acc, track) => {
        if (track.artistId === id) {
          acc.push(this.update(track.id, { ...track, artistId: null }));
        }
        return acc;
      }, []),
    ]);
  }
}
