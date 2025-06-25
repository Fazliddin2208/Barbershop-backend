import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BarbershopService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BarbershopCreateInput) {
    return this.prisma.barbershop.create({ data });
  }

  findAll() {
    return this.prisma.barbershop.findMany();
  }

  findOne(id: string) {
    return this.prisma.barbershop.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.BarbershopUpdateInput) {
    return this.prisma.barbershop.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.barbershop.delete({ where: { id } });
  }
}
