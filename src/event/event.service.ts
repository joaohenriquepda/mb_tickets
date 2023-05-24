import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RollbarLogger } from 'nestjs-rollbar';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly rollbarLogger: RollbarLogger) { }

  async findAll() {
    try {
      const events = await this.prisma.event.findMany();
      this.rollbarLogger.info(`[${EventService.name}] - Get all events`)
      return events;

    } catch (error) {
      this.rollbarLogger.error(`[${new Date().valueOf()} - ${EventService.name}]- An error occurred while get event list - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
      throw error

    }

  }

  async create(createEvent: CreateEventDto) {
    try {
      this.rollbarLogger.debug(`[${EventService.name}] - Initial create event - DATA: ${JSON.stringify(createEvent)}`, JSON.stringify(createEvent))
      const data: Prisma.EventCreateInput = { ...createEvent }

      const createdEvent = await this.prisma.event.create({ data })
      this.rollbarLogger.debug(`[${EventService.name}] - Event was created - DATA: ${JSON.stringify(createdEvent)}`, JSON.stringify(createdEvent))
      return createdEvent

    } catch (error) {
      this.rollbarLogger.error(`[${new Date().valueOf()} - ${EventService.name}]- An error occurred while creating event - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
      throw error
    }
  }

  async updateEvent(id: number, updateEvent: Partial<Event>): Promise<Event> {

    try {
      this.rollbarLogger.info(`[${EventService.name}] - Initial update event - DATA: ${JSON.stringify(updateEvent)}`, JSON.stringify(updateEvent))

      const updatedEvent = await this.prisma.event.update({
        where: { id },
        data: updateEvent,
      });

      this.rollbarLogger.info(`[${EventService.name}] - Event was created - DATA: ${JSON.stringify(updatedEvent)}`, JSON.stringify(updatedEvent))
      return updatedEvent;
    } catch (error) {

      this.rollbarLogger.error(`${new Date().valueOf()} - [${EventService.name}]- An error occurred while updating the event - DATA: ${error}`, JSON.stringify(error))
      throw error
    }

  }

  async findOne(id: number): Promise<Event> {

    try {
      this.rollbarLogger.info(`${new Date().valueOf()} - [${EventService.name}] - Initial get event - DATA: ID: ${JSON.stringify(id)}`, { id })

      const specificEvent = await this.prisma.event.findUniqueOrThrow({
        where: { id }
      });

      this.rollbarLogger.info(`${new Date().valueOf()} - [${EventService.name}] - Event was created - DATA: ${JSON.stringify(specificEvent)}`, JSON.stringify(specificEvent))
      return specificEvent;

    } catch (error) {
      this.rollbarLogger.error(`${new Date().valueOf()} - [${EventService.name}]- An error occurred while searching the event - DATA: ${error}`, JSON.stringify(error))
      throw error
    }
  }


  async deleteOne(id: number): Promise<String> {

    try {
      this.rollbarLogger.info(`${new Date().valueOf()} - [${EventService.name}] - Initial delete event - DATA: ID: ${JSON.stringify(id)}`, { id })

      const specificEvent = await this.prisma.event.delete({
        where: { id }
      });

      this.rollbarLogger.info(`${new Date().valueOf()} - [${EventService.name}] - Event was deleted - DATA: ${JSON.stringify(specificEvent)}`, JSON.stringify(specificEvent))
      return "Event was deleted";

    } catch (error) {
      this.rollbarLogger.error(`${new Date().valueOf()} - [${EventService.name}]- An error occurred while removing the event - DATA: ${error}`, JSON.stringify(error))
      throw error
    }
  }


}
