import { Album } from '../albums/albums.entity';
import { Artist } from '../artists/artists.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Artist, (artist) => artist.id)
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToMany(() => Album, (album) => album.id)
  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
