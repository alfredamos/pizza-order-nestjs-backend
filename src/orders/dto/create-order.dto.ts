/* eslint-disable prettier/prettier */
import { CartItem, Status } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  cartItems: CartItem[];
  @IsNotEmpty()
  @IsString()
  paymentId: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsPositive()
  totalPrice: number;
  @IsBoolean()
  @IsOptional()
  isDelivered?: boolean;
  @IsBoolean()
  @IsOptional()
  isPending?: boolean;
  @IsBoolean()
  @IsOptional()
  isShipped?: boolean;
  @IsNotEmpty()
  @IsPositive()
  totalQuantity: number;
  @IsOptional()
  orderDate: Date = new Date();
  @IsOptional()
  shippingDate: Date;
  @IsOptional()
  deliveryDate: Date;
  @IsOptional()
  status: Status;
}
