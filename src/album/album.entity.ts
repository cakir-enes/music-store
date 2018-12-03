import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { SongEntity } from 'src/song/song.entity';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  genre: string;

  @Column('money')
  price: number;

  @Column('int8')
  date: number;

  @Column('decimal')
  length: number;

  @Column('text')
  link: string;

  @ManyToOne(type => ArtistEntity, artist => artist.albums, {
    onDelete: 'CASCADE',
  })
  artist: ArtistEntity;

  @OneToMany(type => SongEntity, song => song.album, { cascade: true })
  songs: SongEntity[];
}
