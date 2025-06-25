import { Test, TestingModule } from '@nestjs/testing';
import { BarbershopController } from './barbershop.controller';

describe('BarbershopController', () => {
  let controller: BarbershopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarbershopController],
    }).compile();

    controller = module.get<BarbershopController>(BarbershopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
