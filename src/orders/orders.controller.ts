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
import { Roles } from 'src/decorators/role.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles('Admin', 'Staff', 'User')
  @Post()
  async createOrder(@Body() createOrderDto: UpdateOrderDto) {
    return await this.ordersService.createOrder(createOrderDto);
  }

  @Roles('Admin', 'Staff', 'User')
  @Post()
  async orderCreate(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.orderCreate(createOrderDto);
  }

  @Roles('Admin', 'Staff', 'User')
  @Get()
  async findAll() {
    return await this.ordersService.getAllOrders();
  }

  @Roles('Admin', 'Staff', 'User')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.getOneOrder(id);
  }

  @Roles('Admin', 'Staff', 'User')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.editOrder(id, updateOrderDto);
  }

  @Roles('Admin', 'Staff', 'User')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.deleteOrderById(id);
  }

  @Roles('Admin', 'Staff', 'User')
  @Get('orders-by-user-id/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    return await this.ordersService.getAllOrdersByUserId(userId);
  }

  @Roles('Admin')
  @Delete('delete-all-orders-by-user-id/:userId')
  async deleteOrdersByUserId(@Param('userId') userId: string) {
    return await this.ordersService.deleteOrdersByUserId(userId);
  }

  @Roles('Admin')
  @Patch('delivered/:orderId')
  async deliveredOrder(@Param('orderId') orderId: string) {
    return await this.ordersService.orderDelivered(orderId);
  }

  @Roles('Admin')
  @Patch('shipped/:orderId')
  async shippedOrder(@Param('orderId') orderId: string) {
    return await this.ordersService.orderShipped(orderId);
  }
}
