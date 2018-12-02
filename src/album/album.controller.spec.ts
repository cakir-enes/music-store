import { Test, TestingModule } from '@nestjs/testing';
import { AlbumController } from './album.controller';

describe('Album Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AlbumController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AlbumController = module.get<AlbumController>(AlbumController);
    expect(controller).toBeDefined();
  });
});
