import { Router } from 'express';

import { UserType } from '../enums/userType.enum';
import { UserController } from '../controller/user.controller';
import { MiddlewareService } from '../services/middleware.service';

const router: Router = Router();

const userController = new UserController();
const middlewareSerice = new MiddlewareService();

router.route('/').post(userController.createUser);

router
  .route('/:userId')
  .get(middlewareSerice.authorizeRoles([UserType.USER]), userController.getUserById);

export const UserRouter = router;
