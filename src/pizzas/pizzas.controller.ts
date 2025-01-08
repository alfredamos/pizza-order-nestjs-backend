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
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Post()
  async create(@Body() createPizzaDto: CreatePizzaDto) {
    return await this.pizzasService.createPizza(createPizzaDto);
  }

  @Get()
  async findAll() {
    return await this.pizzasService.getAllPizzas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzasService.detailPizza(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzasService.editPizza(id, updatePizzaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pizzasService.deletedPizza(id);
  }
}
