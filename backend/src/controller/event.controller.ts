
import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger.lib';
import { EventDTO } from '../types/event/model';
import { EventService } from '../services/event.service';
import { APIResponse } from '../lib/APIResponse.lib';
import CustomError from '../lib/customError.lib';
import { ApiError } from '../enums/error.enum';

const eventService: EventService = new EventService();
/**
 * EventController.
 */
export class EventController {
  /**
   * createEvent.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const newEvent = req.body;
      const adminId = res.locals.adminId

      const event: EventDTO = await eventService.createEvent(adminId, newEvent);

      res.send(new APIResponse(true, event));
    } catch (err) {
      next(err);
    }
  }

  /**
   * getEventById.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.eventId;

      const event = await eventService.getEvent({eventId});

      res.send(new APIResponse(true, event));
    } catch (err) {
      next(err);
    }
  }

 /**
   * getEventById.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async getAllEventsByAdminId(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = res.locals.adminId
      logger.debug({ adminId })

      const event = await eventService.getAllEvent({adminId})

      res.send(new APIResponse(true, event));
    } catch (err) {
      next(err);
    }
  }

  /**
   * updateEvent.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.eventId;
      const newEvent = req.body;

      const event = await eventService.updateEvent(eventId, newEvent);

      res.send(new APIResponse(true, event));
    } catch (err) {
      next(err);
    }
  }

  public async cancelledEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.eventId;

      const event = await eventService.cancelledEvent(eventId);

      res.send(new APIResponse(true, event));
    } catch (err) {
      next(err);
    }
  }

  public async InProgrssEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.eventId;

      const event = await eventService.InProgrssEvent(eventId);

      res.send(new APIResponse(true, event));
    } catch (err) {
      next(err);
    }

  }

}

