import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, ShowEventDto } from './dto/create-event.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RollbarLogger } from 'nestjs-rollbar';


@Controller('/v1/event')
@ApiTags('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly rollbarLogger: RollbarLogger) { }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'Returns an array of events', type: [ShowEventDto] })
  findAll() {

    this.rollbarLogger.info(`[${EventController.name}] - Get All events`);
    return this.eventService.findAll();
  }

  @ApiBody({ description: "Body for create event", type: CreateEventDto })
  @ApiResponse({ status: 201, description: 'Returns created event', type: ShowEventDto })
  @ApiOperation({ summary: 'Create a unique event' })
  @Post()
  create(@Body() createEvent: CreateEventDto) {

    this.rollbarLogger.debug(`[${EventController.name}] - Initiate create event - DATA: ${JSON.stringify(createEvent)}`, JSON.stringify(createEvent));
    const event = this.eventService.create(createEvent);

    this.rollbarLogger.debug(`[${EventController.name}] - Event has been created`, JSON.stringify(event));
    return event;
  }

}
