import { Module } from '@nestjs/common';
import { TimeSlotService } from './timeslot.service';
import { TimeSlotController } from './timeslot.controller';

@Module({
  providers: [TimeSlotService],
  controllers: [TimeSlotController]
})
export class TimeslotModule {}
