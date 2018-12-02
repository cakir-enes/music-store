import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
