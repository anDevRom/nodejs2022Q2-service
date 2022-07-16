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
import { validate } from 'uuid';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  async getAllArtists() {
    return await this.artistsService.getAll();
  }

  @Get('/:id')
  async getOneArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsService.getOne(id);

    if (!artist) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @HttpCode(201)
  @Post()
  async createArtist(@Body() body: CreateArtistDto) {
    return await this.artistsService.create(body);
  }

  @Put('/:id')
  async updateArtist(@Param('id') id: string, @Body() body: UpdateArtistDto) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsService.update(id, body);

    if (!artist) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @HttpCode(204)
  @Delete('/:id')
  async deleteArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isDeleted = await this.artistsService.delete(id);

    if (!isDeleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
