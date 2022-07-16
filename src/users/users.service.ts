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
      version: 1,
      ...dto,
    };

    const user = await this.usersRepository.create(entity);

    return { ...user, password: undefined };
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.getOne(id);

    if (!user) {
      return;
    }

    const { password: oldPassword, version } = user;

    if (oldPassword === dto.oldPassword) {
      const user = await this.usersRepository.update(
        id,
        dto.newPassword,
        Date.now(),
        version + 1,
      );

      return { ...user, password: undefined };
    } else {
      return 'Invalid old password';
    }
  }

  async delete(id: string) {
    return await this.usersRepository.delete(id);
  }
}
