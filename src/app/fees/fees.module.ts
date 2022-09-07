import { Module } from '@nestjs/common';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';

@Module({
  imports: [],
  controllers: [FeesController],
  providers: [FeesService],
})
export class FeesModule {}
