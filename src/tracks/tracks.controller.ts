import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track';
import { TracksService } from './tracks.service';
import { validate } from 'uuid';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async getAllTracks() {
    return await this.tracksService.getAll();
  }

  @Get('/:id')
  async getOneTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksService.getOne(id);

    if (!track) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @HttpCode(201)
  @Post()
  async createTrack(@Body() body: CreateTrackDto) {
    return await this.tracksService.create(body);
  }

  @Put('/:id')
  async updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksService.update(id, body);

    if (!track) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @HttpCode(204)
  @Delete('/:id')
  async deleteTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isDeleted = await this.tracksService.delete(id);

    if (!isDeleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
