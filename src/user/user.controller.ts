import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowUserDto } from './dto/show-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { RollbarLogger } from 'nestjs-rollbar';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly rollbarLogger: RollbarLogger) { }

  @IsPublic()
  @ApiBody({ description: "Body for register new user", type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Returns created user', type: ShowUserDto })
  @ApiOperation({ summary: 'Create a unique event' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      this.rollbarLogger.debug(`[${UserController.name}] - Initiate create event - DATA: ${JSON.stringify(createUserDto)}`, JSON.stringify(createUserDto));
      const user = this.userService.create(createUserDto);

      this.rollbarLogger.debug(`[${UserController.name}] - Event has been created`, JSON.stringify(event));
      return user;
    } catch (error) {
      this.rollbarLogger.error(`[${new Date().valueOf()} - ${UserController.name}]- An error occurred while creating the event - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
      throw error
    }
  }
}