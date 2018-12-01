import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('song')
export class SongEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') name: string;

  @Column('decimal') length: number;

  @Column('text') album: string;

  @Column('money') price: number;
}
