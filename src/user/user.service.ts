import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RollbarLogger } from 'nestjs-rollbar';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
    private readonly rollbarLogger: RollbarLogger) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    try {
      this.rollbarLogger.debug(`[${UserService.name}] - Initial create user - DATA: ${JSON.stringify(createUserDto)}`, JSON.stringify(createUserDto))

      const data: Prisma.UserCreateInput = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      const createdUser = await this.prisma.user.create({ data });

      this.rollbarLogger.debug(`[${UserService.name}] - Event was created - DATA: ${JSON.stringify(createdUser)}`, JSON.stringify(createdUser))
      return {
        ...createdUser,
        password: undefined,
      };

    } catch (error) {
      this.rollbarLogger.error(`[${new Date().valueOf()} - ${UserService.name}]- An error occurred while creating event - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
      throw error
    }
  }

  findByEmail(email: string) {
    try {
      this.rollbarLogger.info(`${new Date().valueOf()} - [${UserService.name}] - Initial find user - DATA: ID: ${JSON.stringify(email)}`, { email })

      const specificUser = this.prisma.user.findUnique({ where: { email } });

      this.rollbarLogger.info(`${new Date().valueOf()} - [${UserService.name}] - User was founded - DATA: ${JSON.stringify(specificUser)}`, JSON.stringify(specificUser))
      return specificUser;

    } catch (error) {
      this.rollbarLogger.error(`${new Date().valueOf()} - [${UserService.name}]- An error occurred while searching the event - DATA: ${error}`, JSON.stringify(error))

    }
  }

  async findOne(id: number): Promise<User> {

    try {
      this.rollbarLogger.info(`${new Date().valueOf()} - [${UserService.name}] - Initial get user - DATA: ID: ${JSON.stringify(id)}`, { id })

      const specificUser = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          tickets: { include: { event: true } }
        }
      });

      this.rollbarLogger.info(`${new Date().valueOf()} - [${UserService.name}] - Event was created - DATA: ${JSON.stringify(specificUser)}`, JSON.stringify(specificUser))
      return specificUser;

    } catch (error) {
      this.rollbarLogger.error(`${new Date().valueOf()} - [${UserService.name}]- An error occurred while searching the event - DATA: ${error}`, JSON.stringify(error))
      throw error
    }
  }

}