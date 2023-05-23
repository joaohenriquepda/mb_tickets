import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, ShowEventDto } from './dto/create-event.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'Returns an array of events', type: [ShowEventDto] })
  findAll() {
    return this.eventService.findAll();
  }

  @ApiBody({ description: "Body for create event", type: CreateEventDto })
  @ApiResponse({ status: 200, description: 'Returns created event', type: ShowEventDto })
  @ApiOperation({ summary: 'Create a unique event' })
  @Post()
  create(@Body() createEventDto: CreateEventDto) {

    const data: CreateEventDto = {
      "title": createEventDto.title,
      "date": new Date(createEventDto.date),
      "start_time": new Date(createEventDto.start_time),
      "end_time": new Date(createEventDto.end_time),
      "description": createEventDto.description
    }

    return this.eventService.create(data);
  }

}
