import { Module } from '@nestjs/common';
import { BarbershopService } from './barbershop.service';
import { BarbershopController } from './barbershop.controller';

@Module({
  providers: [BarbershopService],
  controllers: [BarbershopController]
})
export class BarbershopModule {}
