import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

      this.rollbarLogger.debug(`[${UserController.name}] - Event has been created`, JSON.stringify(user), JSON.stringify(user));
      return user;
    } catch (error) {
      this.rollbarLogger.error(`[${new Date().valueOf()} - ${UserController.name}]- An error occurred while creating the event - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
      throw error
    }
  }

  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: 'Search a unique user' })
  @Get(':id')
  async getUser(@Param('id') id: number, @Body() updateEven: Partial<ShowUserDto>) {
    try {
      this.rollbarLogger.debug(`${new Date().valueOf()} - [${UserController.name}] - Initiate search event - DATA: ID: ${id}`, { id });
      const user = await this.userService.findOne(id);
      this.rollbarLogger.debug(`${new Date().valueOf()} - [${UserController.name}] - Found Event - DATA: ID: ${user}`, { user });
      return user
    } catch (error) {
      this.rollbarLogger.error(`${new Date().valueOf()} - [${UserController.name}]- An error occurred while searching the event - DATA: ${error}`, JSON.stringify(error))
      throw error
    }
  }
}