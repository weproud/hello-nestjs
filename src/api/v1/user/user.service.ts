import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.users.findMany();
  }
}
