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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumsService.getAll();
  }

  @Get('/:id')
  async getOneAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsService.getOne(id);

    if (!album) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @HttpCode(201)
  @Post()
  async createAlbum(@Body() body: CreateAlbumDto) {
    return await this.albumsService.create(body);
  }

  @Put('/:id')
  async updateAlbum(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsService.update(id, body);

    if (!album) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @HttpCode(204)
  @Delete('/:id')
  async deleteAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isDeleted = await this.albumsService.delete(id);

    if (!isDeleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
