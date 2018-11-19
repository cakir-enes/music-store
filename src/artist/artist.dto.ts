import { IsString, IsDate } from 'class-validator';

export class ArtistDTO {
  @IsString()
  name: string;

  @IsDate()
  foundingDate: Date;
}
