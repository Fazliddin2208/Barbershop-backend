import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TimeslotService } from './timeslot.service';
import { Prisma } from '@prisma/client';

@Controller('timeslots')
export class TimeslotController {
  constructor(private readonly timeslotService: TimeslotService) {}

  @Post()
  create(@Body() data: Prisma.TimeSlotCreateInput) {
    return this.timeslotService.create(data);
  }

  @Get()
  findAll() {
    return this.timeslotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeslotService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TimeSlotUpdateInput) {
    return this.timeslotService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeslotService.remove(id);
  }

  @Get('barber/:barberId')
  findByBarber(@Param('barberId') barberId: string) {
    return this.timeslotService.findByBarber(barberId);
  }
}
