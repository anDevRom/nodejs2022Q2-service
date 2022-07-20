import { Artist } from 'src/artists/artists.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToOne(() => Artist, (artist) => artist.id)
  @Column({ nullable: true })
  artistId: string | null;
}
