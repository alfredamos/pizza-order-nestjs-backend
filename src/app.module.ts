/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PizzasModule } from './pizzas/pizzas.module';
import { AuthModule } from './auth/auth.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { OrdersModule } from './orders/orders.module';
import { StripeModule } from './stripe/stripe.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    PizzasModule,
    AuthModule,
    CartItemsModule,
    OrdersModule,
    StripeModule,
    PrismaModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
