import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { INVALID_OLD_PASSWORD, UsersService } from './users.service';
import { User } from './users.entity';
import { NotFoundInterceptor } from 'src/interceptors';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAll();
  }

  @Get('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async getOneUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.getOne(id);
  }

  @HttpCode(201)
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);

    return new User(user);
  }

  @Put('/:id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePasswordDto,
  ) {
    try {
      const user = await this.usersService.update(id, body);

      if (!user) {
        throw new NotFoundException();
      }

      return new User(user);
    } catch (err) {
      if (err.message === INVALID_OLD_PASSWORD) {
        throw new ForbiddenException();
      }

      throw err;
    }
  }

  @HttpCode(204)
  @Delete('/:id')
  @UseInterceptors(NotFoundInterceptor)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }
}
