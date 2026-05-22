import { Test, TestingModule } from '@nestjs/testing';
import { CandidateAuthService } from './candidate-auth.service';

describe('CandidateAuthService', () => {
  let service: CandidateAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidateAuthService],
    }).compile();

    service = module.get<CandidateAuthService>(CandidateAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
