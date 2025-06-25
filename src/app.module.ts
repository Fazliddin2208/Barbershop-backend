import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BarbershopModule } from './barbershop/barbershop.module';
import { ServiceModule } from './service/service.module';
import { BarberModule } from './barber/barber.module';
import { TimeslotModule } from './timeslot/timeslot.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [PrismaModule, UserModule, BarbershopModule, ServiceModule, BarberModule, TimeslotModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
