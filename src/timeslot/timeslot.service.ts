import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { addMinutes, format } from 'date-fns';
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

  async generateSlots(barberId: string, date: string, intervalMinutes = 30) {
    const barber = await this.prisma.barber.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      throw new Error('Barber topilmadi');
    }

    const startParts = barber.workStart.split(':').map(Number);
    const endParts = barber.workEnd.split(':').map(Number);

    const workDate = new Date(date);

    const workStart = new Date(workDate);
    workStart.setHours(startParts[0], startParts[1], 0, 0);

    const workEnd = new Date(workDate);
    workEnd.setHours(endParts[0], endParts[1], 0, 0);

    const slots: Prisma.TimeSlotCreateManyInput[] = [];

    let current = new Date(workStart);

    while (current < workEnd) {
      slots.push({
        date: workDate,
        startTime: format(current, 'HH:mm'),
        isBooked: false,
        barberId,
      });
      current = addMinutes(current, intervalMinutes);
    }

    return this.prisma.timeSlot.createMany({
      data: slots,
    });
  }
}
