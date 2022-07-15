import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/db';
import { User } from './users.model';

@Injectable()
export class UsersRepository {
  constructor(private db: DataBase) {}

  async findAll() {
    return this.db.USERS;
  }

  async findOne(id: string) {
    return this.db.USERS.find((user) => user.id === id);
  }

  async create(user: User) {
    this.db.USERS.push(user);
    return user;
  }

  async update(
    id: string,
    newPassword: string,
    updatedAt: number,
    version: number,
  ) {
    let updated: User | undefined;

    this.db.USERS = this.db.USERS.map((user) => {
      if (user.id === id) {
        const updatedEntity = {
          ...user,
          password: newPassword,
          updatedAt,
          version,
        };

        updated = updatedEntity;

        return updatedEntity;
      }

      return user;
    });

    return updated;
  }

  async delete(id: string) {
    this.db.USERS = this.db.USERS.filter((user) => user.id !== id);
  }
}
