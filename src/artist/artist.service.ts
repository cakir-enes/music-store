import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistDTO } from './artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async showAll() {
    const idea = await this.artistRepository.find();
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return idea;
  }

  async create(data: ArtistDTO) {
    const artist = await this.artistRepository.create(data);
    await this.artistRepository.save(artist);
    return artist;
  }

  async read(id: string) {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<ArtistDTO>) {
    let idea = await this.artistRepository.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.artistRepository.update({ id }, data);
    idea = await this.artistRepository.findOne({ where: { id } });
    return idea;
  }

  async destroy(id: string) {
    const idea = await this.artistRepository.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.artistRepository.delete({ id });
    return idea;
  }
}
