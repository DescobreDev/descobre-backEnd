import { Test, TestingModule } from '@nestjs/testing';
import { CandidateAuthController } from './candidate-auth.controller';

describe('CandidateAuthController', () => {
  let controller: CandidateAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateAuthController],
    }).compile();

    controller = module.get<CandidateAuthController>(CandidateAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
