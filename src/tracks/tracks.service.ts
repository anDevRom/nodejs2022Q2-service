import { Injectable } from '@nestjs/common';
import { v4 as generateId } from 'uuid';
import { TracksRepository } from './tracks.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './tracks.model';
import { UpdateTrackDto } from './dto/update-track';

@Injectable()
export class TracksService {
  constructor(private tracksRepository: TracksRepository) {}

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
    return await this.tracksRepository.delete(id);
  }
}
