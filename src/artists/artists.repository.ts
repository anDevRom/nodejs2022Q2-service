import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/db';
import { Artist } from './artists.model';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsRepository {
  constructor(private db: DataBase) {}

  async findAll() {
    return this.db.ARTISTS;
  }

  async findOne(id: string) {
    return this.db.ARTISTS.find((artist) => artist.id === id);
  }

  async create(artist: Artist) {
    this.db.ARTISTS.push(artist);
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    let updated: Artist | undefined;

    this.db.ARTISTS = this.db.ARTISTS.map((artist) => {
      if (artist.id === id) {
        const updatedEntity = { ...artist, ...dto };

        updated = updatedEntity;

        return updatedEntity;
      }

      return artist;
    });

    return updated;
  }

  async delete(id: string) {
    let isDeleted = false;
    this.db.ARTISTS = this.db.ARTISTS.filter((artist) => {
      if (artist.id === id) {
        isDeleted = true;
        return false;
      }
      return true;
    });
    return isDeleted;
  }
}
