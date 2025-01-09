/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { Roles } from 'src/decorators/role.decorator';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Roles('Admin')
  @Get('products')
  async getProducts(): Promise<Stripe.Product[]> {
    return await this.stripeService.getProducts();
  }

  @Roles('Admin')
  @Get('customers')
  async getCustomers(): Promise<Stripe.Customer[]> {
    return await this.stripeService.getCustomers();
  }

  @Roles('Admin', 'Staff', 'User')
  @Post('checkout')
  async checkout(@Body() orderProduct: CreateOrderDto) {
    return this.stripeService.paymentCheckout(orderProduct)
  }
}
