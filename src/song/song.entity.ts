import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AlbumEntity } from 'src/album/album.entity';

@Entity('song')
export class SongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('decimal')
  length: number;

  @ManyToOne(type => AlbumEntity, album => album.songs, { onDelete: 'CASCADE' })
  album: AlbumEntity;
}
