/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PizzasService {
  constructor(private prisma: PrismaService){}

  async createPizza(pizza: CreatePizzaDto) {
    const newPizza = await this.prisma.pizza.create({ data: pizza });

    if (!newPizza) {
      throw new BadRequestException('Pizza not created');
    }

    return newPizza;
  }

  async editPizza(id: string, pizza: UpdatePizzaDto) {
    await this.detailPizza(id);

    const editedPizza = await this.prisma.pizza.update({
      data: pizza,
      where: { id },
    });

    if (!editedPizza) {
      throw new BadRequestException(`Pizza with id: ${id} cannot be updated`);
    }

    return editedPizza;
  }

  async deletePizza(id: string) {
    await this.detailPizza(id);

    const deletedPizza = await this.prisma.pizza.delete({ where: { id } });

    return deletedPizza;
  }

  async detailPizza(id: string) {
    const pizza = await this.prisma.pizza.findUnique({ where: { id } });

    if (!pizza) {
      throw new NotFoundException(`Pizza with id: ${id} is not found`);
    }

    return pizza;
  }

  async getAllPizzas() {
    return await this.prisma.pizza.findMany({});
  }
}
