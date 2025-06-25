import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ServiceCreateInput) {
    return this.prisma.service.create({ data });
  }

  findAll() {
    return this.prisma.service.findMany({
      include: {
        barbershop: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        barbershop: true,
      },
    });
  }

  update(id: string, data: Prisma.ServiceUpdateInput) {
    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }

  findByBarbershop(barbershopId: string) {
    return this.prisma.service.findMany({
      where: { barbershopId },
    });
  }
}
