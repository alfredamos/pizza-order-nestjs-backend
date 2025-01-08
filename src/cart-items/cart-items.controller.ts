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
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Roles } from 'src/decorators/role.decorator';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Roles('Admin', 'Staff', 'User')
  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Roles('Admin', 'Staff', 'User')
  @Get()
  findAll() {
    return this.cartItemsService.findAll();
  }

  @Roles('Admin', 'Staff', 'User')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemsService.findOne(id);
  }

  @Roles('Admin', 'Staff', 'User')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(id, updateCartItemDto);
  }

  @Roles('Admin', 'Staff', 'User')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(id);
  }
}
