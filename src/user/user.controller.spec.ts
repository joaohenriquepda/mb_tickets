import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerModule } from 'nestjs-rollbar';
import { PrismaService } from '../prisma/prisma.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
      imports: [LoggerModule.forRoot({
        accessToken: process.env["ROLLBAR_LOGGER"],
        environment: process.env.NODE_ENV,
      })]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
