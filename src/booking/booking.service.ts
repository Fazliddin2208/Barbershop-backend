import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookingCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Booking yaratish
      const booking = await tx.booking.create({
        data,
        include: {
          user: true,
          timeslot: true,
          service: true,
        },
      });

      // 2. Tegishli TimeSlot isBooked ni true qilish
      await tx.timeSlot.update({
        where: { id: booking.timeSlotId },
        data: { isBooked: true },
      });

      return booking;
    });
  }

  findAll() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        timeslot: true,
        service: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        timeslot: true,
        service: true,
      },
    });
  }

  update(id: string, data: Prisma.BookingUpdateInput) {
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
