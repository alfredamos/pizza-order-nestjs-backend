/* eslint-disable prettier/prettier */
import { IsUUID } from "class-validator";
import { CreateOrderDto } from "./create-order.dto";
export class UpdateOrderDto extends CreateOrderDto{
  @IsUUID()
  id: string;
}