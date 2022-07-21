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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumsService.getAll();
  }

  @Get('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async getOneAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumsService.getOne(id);
  }

  @HttpCode(201)
  @Post()
  async createAlbum(@Body() body: CreateAlbumDto) {
    return await this.albumsService.create(body);
  }

  @Put('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAlbumDto,
  ) {
    return await this.albumsService.update(id, body);
  }

  @HttpCode(204)
  @Delete('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumsService.delete(id);
  }
}
