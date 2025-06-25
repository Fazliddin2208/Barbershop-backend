import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BarbershopService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BarbershopCreateInput) {
    return this.prisma.barbershop.create({ data });
  }

  async findAll() {
    return this.prisma.barbershop.findMany({
      include: {
        barbers: true,
        services: true,
      },
    });
  }

  async findOne(id: string) {
    const shop = await this.prisma.barbershop.findUnique({
      where: { id },
      include: {
        barbers: true,
        services: true,
      },
    });

    if (!shop) {
      throw new NotFoundException('Barbershop topilmadi');
    }

    return shop;
  }

  async update(id: string, data: Prisma.BarbershopUpdateInput) {
    const barbershop = await this.prisma.barbershop.findUnique({
      where: { id },
    });

    if (!barbershop) {
      throw new NotFoundException('Barbershop topilmadi');
    }

    return this.prisma.barbershop.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const shop = await this.prisma.barbershop.findUnique({ where: { id } });

    if (!shop) {
      throw new NotFoundException('Barbershop topilmadi');
    }

    return this.prisma.barbershop.delete({ where: { id } });
  }
}
