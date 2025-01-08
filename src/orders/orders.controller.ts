/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: UpdateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Post()
  async orderCreate(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.orderCreate(createOrderDto);
  }

  @Get()
  async findAll() {
    return await this.ordersService.getAllOrders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.getOneOrder(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.editOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.deleteOrderById(id);
  }

  @Get('orders-by-user-id/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    return await this.ordersService.getAllOrdersByUserId(userId);
  }

  @Delete('delete-all-orders-by-user-id/:userId')
  async deleteOrdersByUserId(@Param('userId') userId: string) {
    return await this.ordersService.deleteOrdersByUserId(userId);
  }

  @Patch('delivered/:orderId')
  async deliveredOrder(@Param('orderId') orderId: string) {
    return await this.ordersService.orderDelivered(orderId);
  }

  @Patch('shipped/:orderId')
  async shippedOrder(@Param('orderId') orderId: string) {
    return await this.ordersService.orderShipped(orderId);
  }
}
