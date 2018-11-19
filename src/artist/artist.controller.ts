import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDTO } from './artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  showAllArtists() {
    return this.artistService.showAll();
  }

  @Post()
  createArtist(@Body() data: ArtistDTO) {
    return this.artistService.create(data);
  }

  @Get(':id')
  readArtist(@Param('id') id: string) {
    return this.artistService.read(id);
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() data: Partial<ArtistDTO>) {
    return this.artistService.update(id, data);
  }

  @Delete(':id')
  destroyArtist(@Param('id') id: string) {
    return this.artistService.destroy(id);
  }
}
