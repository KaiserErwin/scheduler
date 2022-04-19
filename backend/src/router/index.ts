import { Router } from 'express';
import { AdminRouter } from './admin.router';
import { AuthRouter } from './auth.router';
import { MiddlewareRouter } from './middleware.router'

const router: Router = Router();

router.use('/', MiddlewareRouter)
router.use('/auth', AuthRouter);
router.use('/admins', AdminRouter);

export const routes: Router = router;
