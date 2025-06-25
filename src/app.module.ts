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
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'common/filters/http-exception.filter';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    BarbershopModule,
    ServiceModule,
    BarberModule,
    TimeslotModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
