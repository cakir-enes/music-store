import { IsArray } from 'class-validator';

export class OrderDTO {
  @IsArray()
  albums: string[];
}
