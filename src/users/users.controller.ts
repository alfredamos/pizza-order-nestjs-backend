/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('Admin')
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Roles('Admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.detailUser(id);
  }

  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
