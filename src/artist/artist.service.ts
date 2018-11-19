import { Injectable } from '@nestjs/common';
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
    return await this.artistRepository.find();
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
    await this.artistRepository.update({ id }, data);
    return await this.artistRepository.findOne({ id });
  }

  async destroy(id: string) {
    await this.artistRepository.delete({ id });
    return { deleted: true };
  }
}
