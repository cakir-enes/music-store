import { IsString, IsNumber } from 'class-validator';

export class SongDTO {
  @IsString()
  name: string;

  @IsNumber()
  length: number;
}
