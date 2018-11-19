import { Test, TestingModule } from '@nestjs/testing';
import { ArtistController } from './artist.controller';

describe('Artist Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ArtistController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ArtistController = module.get<ArtistController>(ArtistController);
    expect(controller).toBeDefined();
  });
});
