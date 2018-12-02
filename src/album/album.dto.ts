import { IsString, IsNumber, IsCurrency } from 'class-validator';

export class AlbumDTO {
  @IsString()
  name: string;

  @IsNumber()
  length: number;

  @IsNumber()
  price: number;

  @IsNumber()
  date: number;
}
