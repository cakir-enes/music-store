import { IsString, IsNumber, IsCurrency } from 'class-validator';

export class AlbumDTO {
  @IsString()
  name: string;

  @IsNumber()
  length: number;

  @IsString()
  genre: string;

  @IsNumber()
  price: number;

  @IsNumber()
  date: number;

  @IsString()
  link: string;
}
