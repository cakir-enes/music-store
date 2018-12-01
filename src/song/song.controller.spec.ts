import { Test, TestingModule } from '@nestjs/testing';
import { SongController } from './song.controller';

describe('Song Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SongController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SongController = module.get<SongController>(SongController);
    expect(controller).toBeDefined();
  });
});
