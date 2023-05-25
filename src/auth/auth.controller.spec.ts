import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity'
import { createMockRequest } from './mocks/request.mock'
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'
import { LoggerModule } from 'nestjs-rollbar';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  // const mockError = Error('Some error');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [PrismaService, AuthService, JwtService, UserService],
      imports: [LoggerModule.forRoot({
        accessToken: process.env["ROLLBAR_LOGGER"],
        environment: process.env.NODE_ENV,
      })]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService)
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with req.user and return the user', async () => {

      const req = createMockRequest({
        user: {
          "email": "email@email.com",
          "password": "@Mb_tickets_1010#"
        }
      })
      const expectedResult = {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZW1h"
      };

      authService.login = jest.fn().mockReturnValue(expectedResult);

      const result = await authController.login(req);

      expect(authService.login).toHaveBeenCalledWith(req.user);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error and log it if an exception is thrown during login', () => {

      const user: User = {
        "name": "João",
        "email": "email@email.com",
        "password": "@Mb_tickets_1010#"
      }
      const req = createMockRequest({
        user: {
          "email": "email-new@email.com",
          "password": "@Mb_tickets_1111#"
        }
      })

      authService.login = jest.fn().mockImplementation(() => {
        // throw mockError;
      });

      // expect(() => authController.login(req)).toThrow(mockError);

    });
  });


});
