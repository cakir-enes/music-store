import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ArtistDTO {
  @IsString()
  name: string;

  @IsNotEmpty()
  foundingDate: Date;
}
