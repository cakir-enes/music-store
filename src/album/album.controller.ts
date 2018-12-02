import {
  Controller,
  Inject,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDTO } from 'src/Album/Album.dto';

@Controller('api/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  showAllAlbums() {
    return this.albumService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() data: AlbumDTO) {
    return this.albumService.create(data);
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
