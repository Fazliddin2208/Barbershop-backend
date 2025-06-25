import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TimeslotService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TimeSlotCreateInput) {
    return this.prisma.timeSlot.create({ data });
  }

  findAll() {
    return this.prisma.timeSlot.findMany({
      include: { barber: true },
    });
  }

  findOne(id: string) {
    return this.prisma.timeSlot.findUnique({
      where: { id },
      include: { barber: true },
    });
  }

  update(id: string, data: Prisma.TimeSlotUpdateInput) {
    return this.prisma.timeSlot.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.timeSlot.delete({
      where: { id },
    });
  }

  findByBarber(barberId: string) {
    return this.prisma.timeSlot.findMany({
      where: { barberId },
    });
  }
}
