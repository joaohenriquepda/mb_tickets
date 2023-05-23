import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('EventController', () => {
  let eventController: EventController;
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
    "title": "Lolapalooza",
    "description": "O evento na lama",
    "date": dateEvent,
    "start_time": startDateEvent,
    "end_time": endDateEvent
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService, PrismaService],
    }).compile();

    eventController = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService)
  });

  it('should be defined', () => {
    expect(eventController).toBeDefined();
    expect(eventService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new entity', async () => {
      jest.spyOn(eventService, 'create').mockResolvedValue(expectedEntity);
      const result = await eventController.create(createDto);

      expect(result).toEqual(expectedEntity);
      expect(eventService.create).toHaveBeenCalledWith(createDto);
    });


    it('should not create a new entity', async () => {

      jest.spyOn(eventService, 'create').mockResolvedValue(expectedEntity);

      // Update value for check validate not create event without title
      delete createDto.title;
      const result = await eventController.create(createDto);

      expect(result).toEqual(expectedEntity);
      expect(eventService.create).toHaveBeenCalledWith(createDto);
    });

  });


});
