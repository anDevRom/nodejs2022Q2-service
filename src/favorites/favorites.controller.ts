import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return await this.favoritesService.getAllFavorites();
  }

  @HttpCode(201)
  @Post('/album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const result = await this.favoritesService.addAlbumToFavorite(id);

    if (result === 'Not found') {
      throw new HttpException('Not Found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @HttpCode(204)
  @Delete('/album/:id')
  async removeAlbumFromFavorites(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isDeleted = await this.favoritesService.removeAlbumFromFavorite(id);

    if (!isDeleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(201)
  @Post('/artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const result = await this.favoritesService.addArtistToFavorite(id);

    if (result === 'Not found') {
      throw new HttpException('Not Found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @HttpCode(204)
  @Delete('/artist/:id')
  async removeArtistFromFavorites(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isDeleted = await this.favoritesService.removeArtistFromFavorite(id);

    if (!isDeleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(201)
  @Post('/track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const result = await this.favoritesService.addTrackToFavorite(id);

    if (result === 'Not found') {
      throw new HttpException('Not Found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @HttpCode(204)
  @Delete('/track/:id')
  async removeTrackFromFavorites(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isDeleted = await this.favoritesService.removeTrackFromFavorite(id);

    if (!isDeleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
