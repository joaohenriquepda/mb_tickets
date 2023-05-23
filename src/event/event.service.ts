import { Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventService {

  private logger = new Logger(EventService.name);

  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    const events = await this.prisma.event.findMany();
    return events;
  }

  async create(createEventDto: CreateEventDto) {
    this.logger.log("Start Create event")
    const data: Prisma.EventCreateInput = { ...createEventDto }
    const createdEvent = await this.prisma.event.create({ data })
    this.logger.log("Event has created", createdEvent)
    return createdEvent
  }
}
