import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { AlbumDTO } from './album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private AlbumRepository: Repository<AlbumEntity>,
  ) {}

  async showAll() {
    const Album = await this.AlbumRepository.find();
    if (!Album) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return Album;
  }

  async create(data: AlbumDTO) {
    const Album = await this.AlbumRepository.create(data);
    await this.AlbumRepository.save(Album);
    return Album;
  }

  async read(id: string) {
    return await this.AlbumRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<AlbumDTO>) {
    let Album = await this.AlbumRepository.findOne({ where: { id } });
    if (!Album) {
      throw new HttpException('Album Not Found', HttpStatus.NOT_FOUND);
    }
    await this.AlbumRepository.update({ id }, data);
    Album = await this.AlbumRepository.findOne({ where: { id } });
    return Album;
  }

  async destroy(id: string) {
    const Album = await this.AlbumRepository.findOne({ where: { id } });
    if (!Album) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.AlbumRepository.delete({ id });
    return Album;
  }
}
