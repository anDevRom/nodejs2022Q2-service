import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  NotFoundInterceptor,
  UnprocessableEntityInterceptor,
} from 'src/interceptors';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return await this.favoritesService.getAllFavorites();
  }

  @HttpCode(201)
  @Post('/album/:id')
  @UseInterceptors(UnprocessableEntityInterceptor)
  async addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addAlbumToFavorite(id);
  }

  @HttpCode(204)
  @Delete('/album/:id')
  @UseInterceptors(NotFoundInterceptor)
  async removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeAlbumFromFavorite(id);
  }

  @HttpCode(201)
  @Post('/artist/:id')
  @UseInterceptors(UnprocessableEntityInterceptor)
  async addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addArtistToFavorite(id);
  }

  @HttpCode(204)
  @Delete('/artist/:id')
  @UseInterceptors(NotFoundInterceptor)
  async removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.favoritesService.removeArtistFromFavorite(id);
  }

  @HttpCode(201)
  @Post('/track/:id')
  @UseInterceptors(UnprocessableEntityInterceptor)
  async addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addTrackToFavorite(id);
  }

  @HttpCode(204)
  @Delete('/track/:id')
  @UseInterceptors(NotFoundInterceptor)
  async removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeTrackFromFavorite(id);
  }
}
