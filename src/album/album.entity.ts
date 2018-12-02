import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') name: string;

  @Column('money') price: number;

  @Column('int8') date: number;

  @Column('decimal') length: number;
}
