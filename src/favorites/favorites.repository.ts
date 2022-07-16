import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/db';
import { Favorites } from './favorites.model';

@Injectable()
export class FavoritesRepository {
  constructor(private db: DataBase) {}

  async findAll(type: keyof Favorites) {
    return this.db.FAVORITES[type];
  }

  async create(type: keyof Favorites, id: string) {
    this.db.FAVORITES[type].push(id);
  }

  async delete(type: keyof Favorites, id: string) {
    let isDeleted = false;
    this.db.FAVORITES[type] = this.db.FAVORITES[type].filter((favoriteId) => {
      if (favoriteId === id) {
        isDeleted = true;
        return false;
      }
      return true;
    });
    return isDeleted;
  }
}
