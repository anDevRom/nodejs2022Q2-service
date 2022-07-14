import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/db';
import { Album } from './albums.model';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsRepository {
  constructor(private db: DataBase) {}

  async findAll() {
    return this.db.ALBUMS;
  }

  async findOne(id: string) {
    return this.db.ALBUMS.find((album) => album.id === id);
  }

  async create(album: Album) {
    this.db.ALBUMS.push(album);
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    let updated: Album | undefined;

    this.db.ALBUMS = this.db.ALBUMS.map((album) => {
      if (album.id === id) {
        const updatedEntity = { ...album, ...dto };

        updated = updatedEntity;

        return updatedEntity;
      }

      return album;
    });

    return updated;
  }

  async delete(id: string) {
    this.db.ALBUMS = this.db.ALBUMS.filter((album) => album.id !== id);
  }
}
