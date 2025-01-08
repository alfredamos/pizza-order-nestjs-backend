/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNumber()
  @IsPositive()
  quantity: number;
  @IsNotEmpty()
  @IsString()
  pizzaId: string;
  @IsOptional()
  orderId: string;
}
