import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SongEntity } from './song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SongDTO } from './song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
  ) {}

  async showAll() {
    const song = await this.songRepository.find();
    if (!song) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return song;
  }

  async create(data: SongDTO) {
    const song = await this.songRepository.create(data);
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
