import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getAllTracks() {
    return this.tracksService.getAll();
  }

  @Get('/:id')
  getOneTrack(@Param('id') id: string) {
    return this.tracksService.getOne(id);
  }

  @Post()
  createTrack(@Body() body: CreateTrackDto) {
    return this.tracksService.create(body);
  }

  @Put('/:id')
  updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    return this.tracksService.update(id, body);
  }

  @Delete('/:id')
  deleteTrack(@Param('id') id: string) {
    return this.tracksService.delete(id);
  }
}
