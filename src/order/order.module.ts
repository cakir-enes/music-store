import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from 'src/user/user.entity';
import { AlbumEntity } from 'src/album/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, AlbumEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
