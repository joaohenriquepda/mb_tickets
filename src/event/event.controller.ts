import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RollbarLogger } from 'nestjs-rollbar';
import { UpdateEventDto } from './dto/update-event.dto';
import { ShowEventDto } from './dto/show-event-dto';


@Controller('/event')
@ApiTags('/event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly rollbarLogger: RollbarLogger) { }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'Returns an array of events', type: [ShowEventDto] })
  findAllEvents() {
    try {
      this.rollbarLogger.info(`[${EventController.name}] - Get All events`);
      return this.eventService.findAll();

    } catch (error) {
      this.rollbarLogger.error(`[${new Date().valueOf()} - ${EventController.name}]- An error occurred while get event list - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
      throw error
    }

  }

  @ApiBody({ description: "Body for create event", type: CreateEventDto })
  @ApiResponse({ status: 201, description: 'Returns created event', type: ShowEventDto })
  @ApiOperation({ summary: 'Create a unique event' })
  @Post()
  createEvent(@Body() createEvent: CreateEventDto) {

    try {
      this.rollbarLogger.debug(`[${EventController.name}] - Initiate create event - DATA: ${JSON.stringify(createEvent)}`, JSON.stringify(createEvent));
      const event = this.eventService.create(createEvent);

      this.rollbarLogger.debug(`[${EventController.name}] - Event has been created`, JSON.stringify(event));
      return event;
    } catch (error) {
      this.rollbarLogger.error(`[${new Date().valueOf()} - ${EventController.name}]- An error occurred while creating the event - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
      throw error
    }


  }

  @ApiBody({ description: "Body for update event", type: UpdateEventDto })
  @ApiResponse({ status: 200, description: 'Event update success', type: ShowEventDto })
  @ApiResponse({ status: 404, description: "Not found" })
  @ApiOperation({ summary: 'Update a unique event' })
  @Put(':id')
  async updateEvent(@Param('id') id: number, @Body() updateEvent: Partial<UpdateEventDto>) {
    try {
      this.rollbarLogger.debug(`${new Date().valueOf()} - [${EventController.name}] - Initiate update event - DATA: ${JSON.stringify(updateEvent)}`, JSON.stringify(updateEvent));
      const updatedEvent: ShowEventDto = await this.eventService.updateEvent(id, updateEvent);
      this.rollbarLogger.debug(`${new Date().valueOf()} - [${EventController.name}] - Event has been updated - DATA: ${JSON.stringify(updatedEvent)}`, JSON.stringify(updatedEvent));
      return updatedEvent
    } catch (error) {
      this.rollbarLogger.error(`[${new Date().valueOf()} - ${EventController.name}]- An error occurred while updating the event - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
      throw error
    }
  }


  @ApiOperation({ summary: 'Search a unique event' })
  @Get(':id')
  async getEvent(@Param('id') id: number, @Body() updateEvent: Partial<UpdateEventDto>) {
    try {
      this.rollbarLogger.debug(`${new Date().valueOf()} - [${EventController.name}] - Initiate search event - DATA: ID: ${id}`, { id });
      const updatedEvent = await this.eventService.findOne(id);
      this.rollbarLogger.debug(`${new Date().valueOf()} - [${EventController.name}] - Found Event - DATA: ID: ${id}`, { id });
      return updatedEvent
    } catch (error) {
      this.rollbarLogger.error(`${new Date().valueOf()} - [${EventController.name}]- An error occurred while searching the event - DATA: ${error}`, JSON.stringify(error))
      throw error
    }
  }

  @ApiResponse({ status: 200, description: 'Event delete success', type: ShowEventDto })
  @ApiOperation({ summary: 'Delete a unique event' })
  @Delete(':id')
  async removeEvent(@Param('id') id: number) {
    this.rollbarLogger.debug(`${new Date().valueOf()} - [${EventController.name}] - Initiate delete event - DATA: ID: ${id}`, { id });
    const updatedEvent = await this.eventService.deleteOne(id);

    this.rollbarLogger.debug(`${new Date().valueOf()} - [${EventController.name}] - Delete Event - DATA: ID: ${id}`, { id });
    return updatedEvent

  }

}
