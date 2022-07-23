import { Artist } from '../artists/artists.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToMany(() => Artist, (artist) => artist.id)
  @Column({ nullable: true })
  artistId: string | null;
}
