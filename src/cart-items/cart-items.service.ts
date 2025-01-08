/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService){}

  async create(cartItem: CreateCartItemDto) {
    const newCartItem = await this.prisma.cartItem.create({ data: cartItem });

    if (!newCartItem) {
      throw new BadRequestException('CartItem not created');
    }

    return newCartItem;
  }

  async update(id: string, cartItem: UpdateCartItemDto) {
    await this.findOne(id); //----> Check for the existence of cart-item.

    const editedCartItem = await this.prisma.cartItem.update({
      data: cartItem,
      where: { id },
    });

    if (!editedCartItem) {
      throw new BadRequestException(`CartItem with id: ${id} cannot be updated`);
    }

    return editedCartItem;
  }

  async remove(id: string) {
    await this.findOne(id); //----> Check for the existence of cart-item.

    const deletedCartItem = await this.prisma.cartItem.delete({
      where: { id },
    });

    return deletedCartItem;
  }

  async findOne(id: string) {
    const cartItem = await this.prisma.cartItem.findUnique({ where: { id } });

    if (!cartItem) {
      throw new NotFoundException(`CartItem with id: ${id} is not found`);
    }

    return cartItem;
  }

  async findAll() {
    return await this.prisma.cartItem.findMany({});
  }
}
