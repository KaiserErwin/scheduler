import { Router } from 'express';

import { UserType } from '../enums/userType.enum';
import { AdminController } from '../controller/admin.controller';
import { MiddlewareService } from '../services/middleware.service';

const router: Router = Router();

const adminController = new AdminController();
const middlewareSerice = new MiddlewareService()

router.route('/').post(adminController.createAdmin);

router.route('/:adminId').get(middlewareSerice.authorizeRoles([UserType.ADMIN]),adminController.getAdminById);

export const AdminRouter = router;
