import { Router } from 'express';

import { UserType } from '../enums/userType.enum';
import { EventController } from '../controller/event.controller';
import { MiddlewareService } from '../services/middleware.service';

const router: Router = Router();

const eventController = new EventController();
const middlewareSerice = new MiddlewareService();

router
  .route('/')
  .post(middlewareSerice.authorizeRoles([UserType.ADMIN]), eventController.createEvent)
  .get(middlewareSerice.authorizeRoles([UserType.ADMIN]), eventController.getAllEventsByAdminId);

router
  .route('/:eventId')
  .get(middlewareSerice.authorizeRoles([UserType.ADMIN]), eventController.getEventById)
  .patch(middlewareSerice.authorizeRoles([UserType.ADMIN]), eventController.updateEvent);

router
  .route('/:eventId/status')
  .post(middlewareSerice.authorizeRoles([UserType.ADMIN]), eventController.InProgrssEvent)
  .delete(middlewareSerice.authorizeRoles([UserType.ADMIN]), eventController.cancelledEvent);

export const EventRouter = router;
