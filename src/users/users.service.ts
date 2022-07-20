import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './users.entity';

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
      const user = await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({ password: dto.newPassword })
        .where('id = :id', { id })
        .returning('*')
        .execute()
        .then((r) => r.raw[0]);

      return user;
    } else {
      return 'Invalid old password';
    }
  }

  async delete(id: string) {
    const { affected: isDeleted } = await this.usersRepository.delete(id);

    return isDeleted;
  }
}
