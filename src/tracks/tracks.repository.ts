import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/db';
import { UpdateTrackDto } from './dto/update-track';
import { Track } from './tracks.model';

@Injectable()
export class TracksRepository {
  constructor(private db: DataBase) {}

  async findAll() {
    return this.db.TRACKS;
  }

  async findOne(id: string) {
    return this.db.TRACKS.find((track) => track.id === id);
  }

  async create(track: Track) {
    this.db.TRACKS.push(track);
    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    let updated: Track | undefined;

    this.db.TRACKS = this.db.TRACKS.map((track) => {
      if (track.id === id) {
        const updatedEntity = { ...track, ...dto };

        updated = updatedEntity;

        return updatedEntity;
      }

      return track;
    });

    return updated;
  }

  async delete(id: string) {
    this.db.TRACKS = this.db.TRACKS.filter((track) => track.id !== id);
  }
}
