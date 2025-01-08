/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  async deleteUser(id: string) {
    await this.detailUser(id);

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return deletedUser;
  }

  async detailUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error(`User with id: ${id} is not found`);
    }

    return user;
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({});
  }
}
