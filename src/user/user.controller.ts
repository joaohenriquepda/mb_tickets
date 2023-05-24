import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowUserDto } from './dto/show-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBody({ description: "Body for register new user", type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Returns created user', type: ShowUserDto })
  @ApiOperation({ summary: 'Create a unique event' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}