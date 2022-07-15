import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAllArtists() {
    return this.artistsService.getAll();
  }

  @Get('/:id')
  getOneArtist(@Param('id') id: string) {
    return this.artistsService.getOne(id);
  }

  @Post()
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.create(body);
  }

  @Put('/:id')
  updateArtist(@Param('id') id: string, @Body() body: UpdateArtistDto) {
    return this.artistsService.update(id, body);
  }

  @Delete('/:id')
  deleteArtist(@Param('id') id: string) {
    return this.artistsService.delete(id);
  }
}
