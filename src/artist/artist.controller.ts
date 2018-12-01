import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Logger,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDTO } from './artist.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('api/artists')
export class ArtistController {
  private logger = new Logger('IdeaController');

  constructor(private artistService: ArtistService) {}

  @Get()
  showAllArtists() {
    return this.artistService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createArtist(@Body() data: ArtistDTO) {
    this.logger.log(JSON.stringify(data));
    return this.artistService.create(data);
  }

  @Get(':id')
  readArtist(@Param('id') id: string) {
    return this.artistService.read(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateArtist(@Param('id') id: string, @Body() data: Partial<ArtistDTO>) {
    this.logger.log(JSON.stringify(data));
    return this.artistService.update(id, data);
  }

  @Delete(':id')
  destroyArtist(@Param('id') id: string) {
    return this.artistService.destroy(id);
  }
}
