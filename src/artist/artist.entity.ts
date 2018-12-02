import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { AlbumEntity } from 'src/album/album.entity';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column('text')
  name: string;

  @Column('date')
  foundingDate: Date;

  //Assoc. albums should be deleted when the artist gets deleted so cascade true.
  @OneToMany(type => AlbumEntity, album => album.artist, { cascade: true })
  albums: AlbumEntity[];
}
