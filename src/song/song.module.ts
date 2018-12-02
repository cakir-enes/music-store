import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './song.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity, AlbumEntity, ArtistEntity])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
