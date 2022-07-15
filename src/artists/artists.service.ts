import { Injectable } from '@nestjs/common';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as generateId } from 'uuid';
import { Artist } from './artists.model';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private artistsRepository: ArtistsRepository) {}

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
    return await this.artistsRepository.delete(id);
  }
}
