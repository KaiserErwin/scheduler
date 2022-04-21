import { Event } from '../model/event.model';
import { EventDTO } from '../types/event/model';
import AdminService from './admin.service';
import { CreateEnventRequest } from '../types/event/request';
import CustomError from 'lib/customError.lib';
import { ApiError } from 'enums/error.enum';
import { EventStatus } from 'enums/event_status.enum';
import { Op } from 'sequelize/types';

/**
 * EventService.
 */
export class EventService {
  /**
   * createEvent.
   *
   * @param {string} adminId
   * @param {CreateEnventRequest} newEvent
   * @returns {Promise<EventDTO>}
   */
  public async createEvent(adminId: string, newEvent: CreateEnventRequest): Promise<EventDTO> {
    try {
      await new AdminService().getAdminById(adminId);

      const event = await Event.create({
        adminId,
        ...newEvent,
      });

      return event;
    } catch (err) {
      throw err;
    }
  }

  /**
   * getEvent.
   *
   * @param {any} filters
   * @returns {Promise<EventDTO>}
   */
  public async getEvent(filters: any = {}): Promise<EventDTO> {
    const event = await Event.findOne({
      where: {
        ...filters,
      },
    });

    if (!event) {
      throw new CustomError(ApiError.Event.eventNotExist);
    }

    return event;
  }

  /**
   * updateEvent.
   *
   * @param {string} eventId
   * @param {CreateEnventRequest} newEvent
   * @returns {Promise<EventDTO>}
   */
  public async updateEvent(eventId: string, newEvent: CreateEnventRequest): Promise<EventDTO> {
    this.getEvent({ eventId });

    const event = await Event.update(newEvent, {
      where: {
        eventId,
      },
    });

    return event[1][0];
  }

  /**
   * getAllEvent.
   *
   * @param {any} filters
   * @returns {Promise<EventDTO[]>}
   */
  public async getAllEvent(filters: any = {}): Promise<EventDTO[]> {
    const event = await Event.findAll({
      where: {
        ...filters,
      },
    });

    return event;
  }

  public async cancelledEvent(eventId: string): Promise<EventDTO> {
    const event = await Event.findOne({
      where: {
        eventId,
      },
    });

    if (!event) {
      throw new CustomError(ApiError.Event.eventNotExist);
    }

    event.status = EventStatus.CANCELLED;

    event.save();

    return event;
  }

  public async InProgrssEvent(eventId: string): Promise<EventDTO> {
    const event = await Event.findOne({
      where: {
        eventId,
        status: {
          [Op.not]: EventStatus.CANCELLED,
        },
      },
    });

    if (!event) {
      throw new CustomError(ApiError.Event.eventNotExist);
    }

    event.status = EventStatus.IN_PROGRESS;

    event.save();

    return event;
  }
}
