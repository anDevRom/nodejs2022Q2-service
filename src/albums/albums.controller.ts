import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAllAlbums() {
    return this.albumsService.getAll();
  }

  @Get('/:id')
  getOneAlbum(@Param('id') id: string) {
    return this.albumsService.getOne(id);
  }

  @Post()
  createAlbum(@Body() body: CreateAlbumDto) {
    return this.albumsService.create(body);
  }

  @Put('/:id')
  updateAlbum(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    return this.albumsService.update(id, body);
  }

  @Delete('/:id')
  deleteAlbum(@Param('id') id: string) {
    return this.albumsService.delete(id);
  }
}
