import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

describe('HomeController', () => {
  let homeController: HomeController;

  beforeEach(async () => {
    const home: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [HomeService],
    }).compile();

    homeController = home.get<HomeController>(HomeController);
  });

  
  it('should be defined', () => {
    expect(homeController).toBeDefined();
  });
  
  test('should random qoute', () => {
    const filterTestFn = jest.fn();
    const qoute = [
      {
        quote:
          "Be who you are and say what you feel, because those who mind don't matter and those who matter don't mind.",
        source: 'Dr. Seuss',
      },
    ];
    
    filterTestFn.mockReturnValueOnce(qoute);

    expect(filterTestFn()).toBe(qoute);
    return filterTestFn();
  });
});
