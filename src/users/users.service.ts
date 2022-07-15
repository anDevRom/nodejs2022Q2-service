import { Injectable } from '@nestjs/common';
import { v4 as generateId } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './users.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getAll() {
    return await this.usersRepository.findAll();
  }

  async getOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async create(dto: CreateUserDto) {
    const id = generateId();
    const createdAt = Date.now();
    const entity: User = {
      id,
      createdAt,
      updatedAt: createdAt,
      version: 0,
      ...dto,
    };

    return await this.usersRepository.create(entity);
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const { password: oldPassowrd, version } = await this.getOne(id);

    if (oldPassowrd === dto.oldPassowrd) {
      return await this.usersRepository.update(
        id,
        dto.newPassword,
        Date.now(),
        version + 1,
      );
    }
  }

  async delete(id: string) {
    return await this.usersRepository.delete(id);
  }
}
