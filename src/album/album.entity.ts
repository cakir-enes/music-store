import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('money')
  price: number;

  @Column('int8')
  date: number;

  @Column('decimal')
  length: number;

  @ManyToOne(type => ArtistEntity, artist => artist.albums)
  artist: ArtistEntity;
}
