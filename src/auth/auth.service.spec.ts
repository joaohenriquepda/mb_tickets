import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerModule } from 'nestjs-rollbar';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, UserService],
      imports: [LoggerModule.forRoot({
        accessToken: process.env["ROLLBAR_LOGGER"],
        environment: process.env.NODE_ENV,
      })]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
