import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  Param,
  Put,
  Delete,
  Logger,
} from '@nestjs/common';
import { SongService } from './song.service';
import { SongDTO } from './song.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('api/songs')
export class SongController {
  constructor(private songService: SongService) {}
  private logger = new Logger('SongController');
  @Get()
  showAllSongs() {
    return this.songService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createSong(@Body() data: SongDTO) {
    return this.songService.create(data);
  }

  @Get(':id')
  readSong(@Param('id') id: string) {
    return this.songService.read(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateSong(@Param('id') id: string, @Body() data: Partial<SongDTO>) {
    this.logger.log(JSON.stringify(data));
    return this.songService.update(id, data);
  }

  @Delete(':id')
  destroySong(@Param('id') id: string) {
    return this.songService.destroy(id);
  }
}
