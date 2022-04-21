import { Router } from 'express';
import { AdminRouter } from './admin.router';
import { AuthRouter } from './auth.router';
import { EventRouter } from './event.router';
import { MiddlewareRouter } from './middleware.router';
import { UserRouter } from './user.router';

const router: Router = Router();

router.use('/', MiddlewareRouter);
router.use('/auth', AuthRouter);
router.use('/admin', AdminRouter);
router.use('/user', UserRouter);
router.use('/event', EventRouter);

export const routes: Router = router;
