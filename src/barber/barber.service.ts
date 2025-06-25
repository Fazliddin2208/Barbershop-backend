import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BarberService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BarberCreateInput) {
    // Barbershop mavjudligini tekshirish
    const barbershop = await this.prisma.barbershop.findUnique({
      where: { id: data?.barbershop?.connect?.id },
    });

    if (!barbershop) {
      throw new BadRequestException('Barbershop topilmadi');
    }

    return this.prisma.barber.create({ data });
  }

  async findAll() {
    return this.prisma.barber.findMany({
      include: {
        barbershop: true,
      },
    });
  }

  async findOne(id: string) {
    const barber = await this.prisma.barber.findUnique({
      where: { id },
      include: {
        barbershop: true,
      },
    });

    if (!barber) {
      throw new NotFoundException('Barber topilmadi');
    }

    return barber;
  }

  async update(id: string, data: Prisma.BarberUpdateInput) {
    const barber = await this.prisma.barber.findUnique({ where: { id } });

    if (!barber) {
      throw new NotFoundException('Barber topilmadi');
    }

    // Agar barbershop ni o'zgartirish kiritilsa, mavjudligini tekshiramiz
    if (data.barbershop?.connect?.id) {
      const barbershop = await this.prisma.barbershop.findUnique({
        where: { id: data.barbershop.connect.id },
      });
      if (!barbershop) {
        throw new BadRequestException('Barbershop topilmadi');
      }
    }

    return this.prisma.barber.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const barber = await this.prisma.barber.findUnique({ where: { id } });

    if (!barber) {
      throw new NotFoundException('Barber topilmadi');
    }

    return this.prisma.barber.delete({ where: { id } });
  }
}
