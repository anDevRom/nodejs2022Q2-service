import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as generateId } from 'uuid';
import { TracksRepository } from './tracks.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './tracks.model';
import { UpdateTrackDto } from './dto/update-track';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    private tracksRepository: TracksRepository,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return await this.tracksRepository.findAll();
  }

  async getOne(id: string) {
    return await this.tracksRepository.findOne(id);
  }

  async create(dto: CreateTrackDto) {
    const id = generateId();
    const entity: Track = { id, ...dto };

    return await this.tracksRepository.create(entity);
  }

  async update(id: string, dto: UpdateTrackDto) {
    return await this.tracksRepository.update(id, dto);
  }

  async delete(id: string) {
    const isDeleted = await this.tracksRepository.delete(id);

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
