import {
  Controller,
  Inject,
  Get,
  Post,
  UsePipes,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDTO } from 'src/Album/Album.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('api/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  showAllAlbums() {
    return this.albumService.showAll();
  }

  @Get('artist/:id')
  showAlbumsByArtist(@Param('id') artistId: string) {
    // return this.albumService.showByArtist(artistId);
    return this.albumService.showByArtist(artistId);
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe())
  createAlbum(@Param('id') artistId: string, @Body() data: AlbumDTO) {
    return this.albumService.create(artistId, data);
  }

  @Get(':id')
  readAlbum(@Param('id') id: string) {
    return this.albumService.read(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateAlbum(@Param('id') id: string, @Body() data: Partial<AlbumDTO>) {
    return this.albumService.update(id, data);
  }

  @Delete(':id')
  destroyAlbum(@Param('id') id: string) {
    return this.albumService.destroy(id);
  }
}
