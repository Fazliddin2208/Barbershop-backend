import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Prisma } from '@prisma/client';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() data: Prisma.BookingCreateInput) {
    return this.bookingService.create(data);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.BookingUpdateInput) {
    return this.bookingService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
