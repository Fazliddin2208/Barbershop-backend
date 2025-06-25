import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BarbershopModule } from './barbershop/barbershop.module';
import { ServiceModule } from './service/service.module';
import { BarberModule } from './barber/barber.module';

@Module({
  imports: [PrismaModule, UserModule, BarbershopModule, ServiceModule, BarberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
