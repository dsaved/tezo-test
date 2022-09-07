import { Module } from '@nestjs/common';
import { FeesModule } from './fees/fees.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [FeesModule, HomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
