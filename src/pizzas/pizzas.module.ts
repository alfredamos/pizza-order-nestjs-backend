/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PizzasController, PrismaModule],
  providers: [PizzasService, PrismaService],
})
export class PizzasModule {}
