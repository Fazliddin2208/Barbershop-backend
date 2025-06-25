import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TimeSlotService } from './timeslot.service';

@Controller('timeslots')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post()
  create(@Body() data: Prisma.TimeSlotCreateInput) {
    return this.timeSlotService.create(data);
  }

  @Get()
  findAll() {
    return this.timeSlotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSlotService.findOne(id);
  }

  @Get('barber/:barberId')
  findByBarber(@Param('barberId') barberId: string) {
    return this.timeSlotService.findByBarber(barberId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TimeSlotUpdateInput) {
    return this.timeSlotService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.timeSlotService.delete(id);
  }

  @Post('generate')
  generateForDay(@Body() body: { barberId: string; date: string }) {
    return this.timeSlotService.generateForDay(
      body.barberId,
      new Date(body.date),
    );
  }
}
