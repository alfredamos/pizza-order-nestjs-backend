/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID } from "class-validator";
import { CreateOrderDto } from "./create-order.dto";
export class UpdateOrderDto extends CreateOrderDto{
  @IsNotEmpty()
  @IsUUID()
  id: string;
}