/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { OrdersService } from 'src/orders/orders.service';
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string, private orderService: OrdersService) {
    this.stripe = new Stripe(this.apiKey, {
      // apiVersion: '2023-10-16', // Use whatever API latest version
      apiVersion: '2024-12-18.acacia', // Use whatever API latest version
    });
  }

  async getProducts(): Promise<Stripe.Product[]> {   
    const products = await this.stripe.products.list();
    
    console.log({products})
    
    return products.data;
  }

  async getCustomers(): Promise<Stripe.Customer[]> {
    const customers = await this.stripe.customers.list({});
    
    console.log({customers})
    
    return customers.data;
  }
  async paymentCheckout(orderPayload: CreateOrderDto) {
    //----> Destructure orderPayload.
    const { cartItems } = orderPayload;

    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        ...cartItems?.map((cart) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: cart.name,
              images: [cart.image],
            },
            unit_amount: cart.price * 100,
          },
          quantity: cart.quantity,
        })),
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/payment-failure`,
    });

    const { id} = session;

    //-----> If there's sessionPayload, then store the order in the database.
    if (!!id) {
      orderPayload.paymentId = id;
      orderPayload.orderDate = new Date();
      await this.orderService.orderCreate(orderPayload);
    }

    return session;
  }
}
