/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePizzaDto } from './create-pizza.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
