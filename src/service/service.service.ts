import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ServiceCreateInput) {
    // Barbershop mavjudligini tekshirish
    const barbershop = await this.prisma.barbershop.findUnique({
      where: { id: data?.barbershop?.connect?.id },
    });

    if (!barbershop) {
      throw new BadRequestException('Barbershop topilmadi');
    }

    return this.prisma.service.create({ data });
  }

  async findAll() {
    return this.prisma.service.findMany({
      include: {
        barbershop: true,
      },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        barbershop: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Xizmat topilmadi');
    }

    return service;
  }

  async update(id: string, data: Prisma.ServiceUpdateInput) {
    const service = await this.prisma.service.findUnique({ where: { id } });

    if (!service) {
      throw new NotFoundException('Xizmat topilmadi');
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

    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id } });

    if (!service) {
      throw new NotFoundException('Xizmat topilmadi');
    }

    return this.prisma.service.delete({ where: { id } });
  }
}
