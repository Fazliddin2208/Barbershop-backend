import { Module } from '@nestjs/common';
import { TimeslotService } from './timeslot.service';
import { TimeslotController } from './timeslot.controller';

@Module({
  providers: [TimeslotService],
  controllers: [TimeslotController]
})
export class TimeslotModule {}
