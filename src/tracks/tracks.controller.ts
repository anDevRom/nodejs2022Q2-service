import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { NotFoundInterceptor } from 'src/interceptors';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async getAllTracks() {
    return await this.tracksService.getAll();
  }

  @Get('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async getOneTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tracksService.getOne(id);
  }

  @HttpCode(201)
  @Post()
  async createTrack(@Body() body: CreateTrackDto) {
    return await this.tracksService.create(body);
  }

  @Put('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTrackDto,
  ) {
    return await this.tracksService.update(id, body);
  }

  @HttpCode(204)
  @Delete('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tracksService.delete(id);
  }
}
