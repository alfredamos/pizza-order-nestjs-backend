/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreatePizzaDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  topping: string;
  @IsNotEmpty()
  @IsPositive()
  price: number;
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
}
