import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

export const INVALID_OLD_PASSWORD = 'Invalid old password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, Number(process.env.CRYPT_SALT));
  }

  async getAll() {
    return await this.usersRepository.find();
  }

  async getOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async getOneByLogin(login: string) {
    return await this.usersRepository.findBy({ login })[0];
  }

  async create(dto: CreateUserDto) {
    const { password } = dto;

    const hashedPassword = await this.hashData(password);

    return await this.usersRepository.save({
      ...dto,
      password: hashedPassword,
      refreshToken: ''
    });
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

  async updateRefreshToken(id: string, newRefreshToken: string) {
    const hashedNewRefreshToken = await this.hashData(newRefreshToken);
    
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ refreshToken: hashedNewRefreshToken })
      .where('id = :id', { id })
      .execute();
  }

  async delete(id: string) {
    const { affected: isDeleted } = await this.usersRepository.delete(id);

    return isDeleted;
  }
}
