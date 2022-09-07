import { Test, TestingModule } from '@nestjs/testing';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';

describe('FeesController', () => {
  let feesController: FeesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FeesController],
      providers: [FeesService],
    }).compile();

    feesController = app.get<FeesController>(FeesController);
  });
  
  it('should be defined', () => {
    expect(feesController).toBeDefined();
  });
});
