import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as generateId } from 'uuid';
import { Album } from './albums.model';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private albumsRepository: AlbumsRepository) {}

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
    return await this.albumsRepository.delete(id);
  }
}
