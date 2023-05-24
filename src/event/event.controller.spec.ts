import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerModule } from 'nestjs-rollbar';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService
  const dateEvent = new Date()
  const startDateEvent = new Date(dateEvent.setMonth(dateEvent.getMonth() + 8))
  const endDateEvent = new Date(new Date(startDateEvent).setHours(startDateEvent.getHours() + 6))
  const mockError = Error('Some error');

  let createDto: CreateEventDto = {
    "title": "Lolapalooza TEST",
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
      controllers: [EventController],
      providers: [EventService, PrismaService],
      imports: [LoggerModule.forRoot({
        accessToken: process.env["ROLLBAR_LOGGER"],
        environment: process.env.NODE_ENV,
      })]
    }).compile();

    eventController = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService)
  });

  it('should be defined', () => {
    expect(eventController).toBeDefined();
    expect(eventService).toBeDefined();
  });


  describe('FindAll', () => {

    it('should call eventService findAll and return the result', () => {
      const mockEventList = [createDto, createDto];
      eventService.findAll = jest.fn().mockReturnValue(mockEventList);

      const result = eventController.findAllEvents();

      expect(eventService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockEventList);
    });

    test('should throw an error and log it when eventService findAll throws an error', () => {

      eventService.findAll = jest.fn().mockImplementation(() => {
        throw mockError;
      });

      expect(() => {
        eventController.findAllEvents();
      }).toThrow(mockError);

    });

  })


  describe('create', () => {
    it('should create a new entity', async () => {
      eventService.create = jest.fn().mockReturnValue(expectedEntity);

      const result = await eventController.createEvent(createDto);

      expect(result).toEqual(expectedEntity);
      expect(eventService.create).toHaveBeenCalledWith(createDto);
    });


    it('should not create a new entity', async () => {
      eventService.create = jest.fn().mockImplementation(() => {
        throw mockError;
      });

      delete createDto.title;

      expect(() => {
        eventController.createEvent(createDto);
      }).toThrow(mockError);

      expect(eventService.create).toHaveBeenCalledWith(createDto);
    });

  });

  describe('removeEvent', () => {
    it('should remove an event and return the updated event message', async () => {
      const id = 1;
      const updateEvent = createDto;
      updateEvent.description = "Updated description for event"

      eventService.deleteOne = jest.fn().mockReturnValue("Event was deleted");

      expect(await eventController.removeEvent(id)).toBe("Event was deleted");
      expect(eventService.deleteOne).toHaveBeenCalledWith(id);
    });

  });


  describe('Update Event', () => {
    it('should update an event and return the updated event', async () => {
      const id = 1;
      const updateEvent = createDto;
      updateEvent.description = "Updated description for event"

      eventService.updateEvent = jest.fn().mockReturnValue(updateEvent);
      await eventController.updateEvent(id, updateEvent)

      expect(eventService.updateEvent).toHaveBeenCalledWith(id, updateEvent);
    });

  });



});
