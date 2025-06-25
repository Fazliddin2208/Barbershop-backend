import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BarberService } from './barber.service';
import { Prisma } from '@prisma/client';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  create(@Body() data: Prisma.BarberCreateInput) {
    return this.barberService.create(data);
  }

  @Get()
  findAll() {
    return this.barberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barberService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.BarberUpdateInput) {
    return this.barberService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barberService.remove(id);
  }
}
