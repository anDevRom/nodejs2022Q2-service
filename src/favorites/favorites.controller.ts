import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavorite(id);
  }

  @Delete('/album/:id')
  removeAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavorite(id);
  }

  @Post('/artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorite(id);
  }

  @Delete('/artist/:id')
  removeArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavorite(id);
  }

  @Post('/track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorite(id);
  }

  @Delete('/track/:id')
  removeTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavorite(id);
  }
}
