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
import { Roles } from 'src/decorators/role.decorator';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Roles('Admin')
  @Post()
  async create(@Body() createPizzaDto: CreatePizzaDto) {
    return await this.pizzasService.createPizza(createPizzaDto);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return await this.pizzasService.getAllPizzas();
  }

  @Roles('Admin', 'Staff', 'User')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pizzasService.detailPizza(id);
  }

  @Roles('Admin')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ) {
    return await this.pizzasService.editPizza(id, updatePizzaDto);
  }

  @Roles('Admin', 'Staff', 'User')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pizzasService.deletedPizza(id);
  }
}
