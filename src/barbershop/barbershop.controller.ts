import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { BarbershopService } from './barbershop.service';
import { Prisma } from '@prisma/client';

@Controller('barbershops')
export class BarbershopController {
  constructor(private readonly barbershopService: BarbershopService) {}

  @Post()
  create(@Body() data: Prisma.BarbershopCreateInput) {
    return this.barbershopService.create(data);
  }

  @Get()
  findAll() {
    return this.barbershopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barbershopService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.BarbershopUpdateInput) {
    return this.barbershopService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.barbershopService.delete(id);
  }
}
