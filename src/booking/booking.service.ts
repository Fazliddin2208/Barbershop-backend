import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookingCreateInput) {
    // User tekshirish
    const user = await this.prisma.user.findUnique({
      where: { id: data?.user?.connect?.id },
    });
    if (!user) {
      throw new BadRequestException('Foydalanuvchi topilmadi');
    }

    // TimeSlot tekshirish
    const timeslot = await this.prisma.timeSlot.findUnique({
      where: { id: data?.timeslot?.connect?.id },
    });
    if (!timeslot) {
      throw new BadRequestException('TimeSlot topilmadi');
    }
    if (timeslot.isBooked) {
      throw new BadRequestException('Bu TimeSlot allaqachon band qilingan');
    }

    // Agar service optional qilgan bo'lsang, mavjud bo'lsa tekshiramiz
    if (data.service?.connect?.id) {
      const service = await this.prisma.service.findUnique({
        where: { id: data.service.connect.id },
      });
      if (!service) {
        throw new BadRequestException('Service topilmadi');
      }
    }

    // TimeSlot'ni band qilib qo'yamiz
    await this.prisma.timeSlot.update({
      where: { id: data?.timeslot?.connect?.id },
      data: { isBooked: true },
    });

    return this.prisma.booking.create({ data });
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        timeslot: {
          include: { barber: true },
        },
        service: true,
      },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        timeslot: {
          include: { barber: true },
        },
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking topilmadi');
    }

    return booking;
  }

  async update(id: string, data: Prisma.BookingUpdateInput) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking topilmadi');
    }

    // Agar user o'zgartirilsa, tekshiramiz
    if (data.user?.connect?.id) {
      const user = await this.prisma.user.findUnique({
        where: { id: data.user.connect.id },
      });
      if (!user) {
        throw new BadRequestException('Foydalanuvchi topilmadi');
      }
    }

    // Agar service o'zgartirilsa, tekshiramiz
    if (data.service?.connect?.id) {
      const service = await this.prisma.service.findUnique({
        where: { id: data.service.connect.id },
      });
      if (!service) {
        throw new BadRequestException('Xizmat topilmadi');
      }
    }

    // Agar timeslot o'zgartirilsa:
    if (
      data.timeslot?.connect?.id &&
      data.timeslot.connect.id !== booking.timeSlotId
    ) {
      const newSlot = await this.prisma.timeSlot.findUnique({
        where: { id: data.timeslot.connect.id },
      });
      if (!newSlot) {
        throw new BadRequestException('Yangi TimeSlot topilmadi');
      }
      if (newSlot.isBooked) {
        throw new BadRequestException(
          'Yangi TimeSlot allaqachon band qilingan',
        );
      }

      // Eski slotni bandlikdan chiqaramiz
      await this.prisma.timeSlot.update({
        where: { id: booking.timeSlotId },
        data: { isBooked: false },
      });

      // Yangi slotni band qilamiz
      await this.prisma.timeSlot.update({
        where: { id: newSlot.id },
        data: { isBooked: true },
      });
    }

    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      throw new NotFoundException('Booking topilmadi');
    }

    // Bandlikni false qilamiz
    await this.prisma.timeSlot.update({
      where: { id: booking.timeSlotId },
      data: { isBooked: false },
    });

    return this.prisma.booking.delete({ where: { id } });
  }
}
