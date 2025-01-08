/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './create-cart-item.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
