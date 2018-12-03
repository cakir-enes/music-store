import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  Column,
  AfterInsert,
  BeforeInsert,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AlbumEntity } from 'src/album/album.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => UserEntity, user => user.orders)
  user: UserEntity;

  @ManyToMany(type => AlbumEntity, { cascade: true })
  @JoinTable()
  albums: AlbumEntity[];

  @Column('money', { nullable: true })
  totalPrice: number;

  @BeforeInsert()
  private findTotalPrice() {
    this.totalPrice = this.albums.reduce(
      (total, album) => total + Number(String(album.price).replace('$', '')),
      0,
    );
  }
}
