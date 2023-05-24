import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RollbarLogger } from 'nestjs-rollbar';

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
}
