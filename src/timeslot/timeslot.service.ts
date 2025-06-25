import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { addMinutes, format } from 'date-fns';

@Injectable()
export class TimeSlotService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TimeSlotCreateInput) {
    // Barber mavjudligini tekshirish
    const barber = await this.prisma.barber.findUnique({
      where: { id: data?.barber?.connect?.id },
    });

    if (!barber) {
      throw new BadRequestException('Barber topilmadi');
    }

    return this.prisma.timeSlot.create({ data });
  }

  async findAll() {
    return this.prisma.timeSlot.findMany({
      include: {
        barber: true,
        booking: true,
      },
    });
  }

  async findOne(id: string) {
    const slot = await this.prisma.timeSlot.findUnique({
      where: { id },
      include: {
        barber: true,
        booking: true,
      },
    });

    if (!slot) {
      throw new NotFoundException('TimeSlot topilmadi');
    }

    return slot;
  }

  async findByBarber(barberId: string) {
    const barber = await this.prisma.barber.findUnique({
      where: { id: barberId },
    });
    if (!barber) {
      throw new NotFoundException('Barber topilmadi');
    }

    return this.prisma.timeSlot.findMany({
      where: { barberId },
      orderBy: { date: 'asc' },
    });
  }

  async update(id: string, data: Prisma.TimeSlotUpdateInput) {
    const timeslot = await this.prisma.timeSlot.findUnique({ where: { id } });

    if (!timeslot) {
      throw new NotFoundException('TimeSlot topilmadi');
    }

    // Agar barberni o'zgartirish kiritilsa, mavjudligini tekshiramiz
    if (data.barber?.connect?.id) {
      const barber = await this.prisma.barber.findUnique({
        where: { id: data.barber.connect.id },
      });
      if (!barber) {
        throw new BadRequestException('Barber topilmadi');
      }
    }

    return this.prisma.timeSlot.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const slot = await this.prisma.timeSlot.findUnique({ where: { id } });

    if (!slot) {
      throw new NotFoundException('TimeSlot topilmadi');
    }

    return this.prisma.timeSlot.delete({ where: { id } });
  }

  async generateForDay(barberId: string, date: Date) {
    const barber = await this.prisma.barber.findUnique({
      where: { id: barberId },
    });
    if (!barber) {
      throw new BadRequestException('Barber topilmadi');
    }

    // Ish boshlanish va tugash vaqtlarini Date shakliga keltiramiz
    const workDate = new Date(date);
    const [startHour, startMin] = barber.workStart.split(':').map(Number);
    const [endHour, endMin] = barber.workEnd.split(':').map(Number);

    const startDateTime = new Date(workDate);
    startDateTime.setHours(startHour, startMin, 0, 0);

    const endDateTime = new Date(workDate);
    endDateTime.setHours(endHour, endMin, 0, 0);

    const slots: Prisma.TimeSlotCreateManyInput[] = [];

    let current = new Date(startDateTime);

    while (current < endDateTime) {
      const slotStartTime = format(current, 'HH:mm');

      slots.push({
        date: workDate,
        startTime: slotStartTime,
        isBooked: false,
        barberId,
      });

      current = addMinutes(current, 30);
    }

    if (slots.length === 0) {
      throw new BadRequestException(
        'Ish vaqti noto‘g‘ri belgilangan yoki slotlar chiqmayapti',
      );
    }

    // TimeSlotlarni ko'plab qo'shish
    return this.prisma.timeSlot.createMany({
      data: slots,
      skipDuplicates: true, // Agar bir xil slot allaqachon mavjud bo‘lsa, xato bermaydi
    });
  }
}
