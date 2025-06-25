import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Prisma } from '@prisma/client';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() data: Prisma.ServiceCreateInput) {
    return this.serviceService.create(data);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ServiceUpdateInput) {
    return this.serviceService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }

  @Get('barbershop/:barbershopId')
  findByBarbershop(@Param('barbershopId') barbershopId: string) {
    return this.serviceService.findByBarbershop(barbershopId);
  }
}
