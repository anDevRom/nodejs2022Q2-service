import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAll();
  }

  @Get('/:id')
  async getOneUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getOne(id);

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @HttpCode(201)
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user: any = await this.usersService.create(body);

    return new User(user);
  }

  @Put('/:id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePasswordDto,
  ) {
    const user = await this.usersService.update(id, body);

    if (user === 'Invalid old password') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return new User(user);
  }

  @HttpCode(204)
  @Delete('/:id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = await this.usersService.delete(id);

    if (!isDeleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
