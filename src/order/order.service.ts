import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Repository, In } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { OrderDTO } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async showAll() {
    const orders = await this.orderRepository.find({
      relations: ['user', 'albums'],
    });
    return orders;
  }

  async showByUser(userId: string) {
    const user = await this.userRepository
      .findOneOrFail({
        where: { id: userId },
        relations: ['orders', 'orders.albums'],
      })
      .catch(() => {
        throw new HttpException('Cant find user', HttpStatus.BAD_REQUEST);
      });
    return user;
  }

  async create(userId: string, data: OrderDTO) {
    const user = await this.userRepository
      .findOneOrFail({ where: { id: userId } })
      .catch(() => {
        throw new HttpException('Cant find user', HttpStatus.BAD_REQUEST);
      });
    if (data.albums.length == 0) {
      throw new HttpException('Albums cant be empty', HttpStatus.BAD_REQUEST);
    }
    const albums = await this.albumRepository.find({
      where: { id: In(data.albums) },
    });
    if (albums.length != data.albums.length) {
      throw new HttpException('Wrong album id', HttpStatus.BAD_REQUEST);
    }
    console.log('LOGG\n');
    albums.forEach(x => console.log(x));
    const order = await this.orderRepository.create({ user, albums });
    await this.orderRepository.save(order);
    return order;
  }

  async read(id: string) {
    const order = await this.orderRepository.find({
      where: { id },
      relations: ['user', 'albums'],
    });
    return order;
  }
}
