import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { SongEntity } from './song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SongDTO } from './song.dto';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async showAll() {
    const songs = await this.artistRepository.find({
      relations: ['albums', 'albums.songs'],
    });
    return songs;
  }

  async showByAlbum(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) {
      throw new HttpException(
        'Cant find album with the given id',
        HttpStatus.BAD_REQUEST,
      );
    }
    const songs = await this.songRepository.find({
      where: { album: { id: albumId } },
    });
    return { album, songs };
  }

  async create(albumId: string, data: SongDTO) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) {
      throw new HttpException('Cant find album', HttpStatus.BAD_REQUEST);
    }
    const song = await this.songRepository.create({ ...data, album });
    await this.songRepository.save(song);
    return song;
  }

  async read(id: string) {
    return await this.songRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<SongDTO>) {
    let song = await this.songRepository.findOne({ where: { id } });
    if (!song) {
      throw new HttpException('Song Not Found', HttpStatus.NOT_FOUND);
    }
    await this.songRepository.update({ id }, data);
    song = await this.songRepository.findOne({ where: { id } });
    return song;
  }

  async destroy(id: string) {
    const song = await this.songRepository.findOne({ where: { id } });
    if (!song) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.songRepository.delete({ id });
    return song;
  }
}
