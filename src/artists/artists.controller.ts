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
  @UseInterceptors(NotFoundInterceptor)
  async getOneArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistsService.getOne(id);
  }

  @HttpCode(201)
  @Post()
  async createArtist(@Body() body: CreateArtistDto) {
    return await this.artistsService.create(body);
  }

  @Put('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateArtistDto,
  ) {
    return await this.artistsService.update(id, body);
  }

  @HttpCode(204)
  @Delete('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistsService.delete(id);
  }
}
