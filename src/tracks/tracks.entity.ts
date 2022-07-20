import { Album } from 'src/albums/albums.entity';
import { Artist } from 'src/artists/artists.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Artist, (artist) => artist.id)
  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => Album, (album) => album.id)
  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
