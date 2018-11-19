import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';


@Module({
  imports: [TypeOrmModule.forRoot(), ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
