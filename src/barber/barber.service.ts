import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BarberService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BarberCreateInput) {
    return this.prisma.barber.create({ data });
  }

  findAll() {
    return this.prisma.barber.findMany({
      include: {
        barbershop: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.barber.findUnique({
      where: { id },
      include: { barbershop: true },
    });
  }

  update(id: string, data: Prisma.BarberUpdateInput) {
    return this.prisma.barber.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.barber.delete({
      where: { id },
    });
  }
}
