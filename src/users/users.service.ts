import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './users.entity';

export const INVALID_OLD_PASSWORD = 'Invalid old password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.usersRepository.find();
  }

  async getOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(dto: CreateUserDto) {
    return await this.usersRepository.save(dto);
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.getOne(id);

    if (!user) {
      return;
    }

    const { password: oldPassword } = user;

    if (oldPassword === dto.oldPassword) {
      const {
        raw: [updated],
      } = await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({ password: dto.newPassword })
        .where('id = :id', { id })
        .returning('*')
        .execute();

      return updated;
    } else {
      throw new Error(INVALID_OLD_PASSWORD);
    }
  }

  async delete(id: string) {
    const { affected: isDeleted } = await this.usersRepository.delete(id);

    return isDeleted;
  }
}
