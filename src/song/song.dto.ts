import { IsString, IsNumber, IsCurrency } from 'class-validator';

export class SongDTO {
  @IsString()
  name: string;

  @IsNumber()
  length: number;

  @IsString()
  album: string;

  @IsNumber()
  price: number;
}
