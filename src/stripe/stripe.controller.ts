/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('products')
  async getProducts(): Promise<Stripe.Product[]> {
    return await this.stripeService.getProducts();
  }

  @Get('customers')
  async getCustomers(): Promise<Stripe.Customer[]> {
    return await this.stripeService.getCustomers();
  }

  @Post('payment')
  async checkout(){
    
  }
}
