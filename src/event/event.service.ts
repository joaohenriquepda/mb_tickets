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
    const events = await this.prisma.event.findMany();
    this.rollbarLogger.info(`[${EventService.name}] - Get all events`)
    return events;
  }

  async create(createEvent: CreateEventDto) {

    this.rollbarLogger.debug(`[${EventService.name}] - Initial create event - DATA: ${JSON.stringify(createEvent)}`, JSON.stringify(createEvent))
    const data: Prisma.EventCreateInput = { ...createEvent }

    const createdEvent = await this.prisma.event.create({ data })
    this.rollbarLogger.debug(`[${EventService.name}] - Event was created - DATA: ${JSON.stringify(createdEvent)}`, JSON.stringify(createdEvent))
    return createdEvent
  }

  async update(id: number, updateEvent: Partial<Event>): Promise<Event> {

    this.rollbarLogger.info(`[${EventService.name}] - Initial update event - DATA: ${JSON.stringify(updateEvent)}`, JSON.stringify(updateEvent))

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: updateEvent,
    });

    this.rollbarLogger.info(`[${EventService.name}] - Event was created - DATA: ${JSON.stringify(updatedEvent)}`, JSON.stringify(updatedEvent))
    return updatedEvent;
  }

  async findOne(id: number): Promise<Event> {
    this.rollbarLogger.info(`${new Date().valueOf()} - [${EventService.name}] - Initial get event - DATA: ID: ${JSON.stringify(id)}`, { id })

    const specificEvent = await this.prisma.event.findUniqueOrThrow({
      where: { id }
    });

    this.rollbarLogger.info(`${new Date().valueOf()} - [${EventService.name}] - Event was created - DATA: ${JSON.stringify(specificEvent)}`, JSON.stringify(specificEvent))
    return specificEvent;

  }


}
