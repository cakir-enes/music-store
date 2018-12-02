import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { AlbumDTO } from './album.dto';
import { ArtistEntity } from 'src/artist/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async showByArtist(artistId: string) {
    const albums = await this.albumRepository
      .createQueryBuilder('album')
      .leftJoin('album.artist', 'artist')
      .getMany();
    return albums;
  }

  async showAll() {
    const album = await this.albumRepository.find({ relations: ['artist'] });
    return album;
  }

  async create(artistId: string, data: AlbumDTO) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist) {
      throw new BadRequestException('Cant create Album: Artist not found!');
    }
    const album = await this.albumRepository.create({ ...data, artist });
    await this.albumRepository.save(album);
    return album;
  }

  async read(id: string) {
    return await this.albumRepository.findOne({
      where: { id },
      relations: ['artist'],
    });
  }

  async update(id: string, data: Partial<AlbumDTO>) {
    let album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException('album Not Found', HttpStatus.NOT_FOUND);
    }
    await this.albumRepository.update({ id }, data);
    album = await this.albumRepository.findOne({
      where: { id },
      relations: ['artist'],
    });
    return album;
  }

  async destroy(id: string) {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['artist'],
    });
    if (!album) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.albumRepository.delete({ id });
    return album;
  }
}
