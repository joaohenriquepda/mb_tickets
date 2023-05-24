import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventService', () => {
  let eventService: EventService
  const dateEvent = new Date()
  const startDateEvent = new Date(dateEvent.setMonth(dateEvent.getMonth() + 8))
  const endDateEvent = new Date(new Date(startDateEvent).setHours(startDateEvent.getHours() + 6))

  let createDto: CreateEventDto = {
    "title": "Lolapalooza",
    "description": "O evento na lama",
    "date": dateEvent,
    "start_time": startDateEvent,
    "end_time": endDateEvent
  }
  let expectedEntity = {
    "id": 1,
    ...createDto
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, PrismaService],
    }).compile();

    eventService = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(eventService).toBeDefined();
  });

  it('should create a new entity', async () => {

    const result = await eventService.create(createDto);

    expect(result).toEqual(expectedEntity);
    expect(result).toBeDefined();
  });


  it('should not create a new entity without title', async () => {

    delete createDto.title;
    expect(eventService.create(createDto)).rejects.toThrow("Argument title for data.title is missing.")
  });

  it('should not create a new entity without date', async () => {
    delete createDto.date;
    expect(eventService.create(createDto)).rejects.toThrow()
  });

});
