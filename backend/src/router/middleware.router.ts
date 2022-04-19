import { Router } from 'express'
import Admin from '../model/admin.model'
import User from '../model/user.model'
import { UserType } from '../enums/userType.enum'
import logger from '../lib/logger.lib'
import { AuthService } from '../services/auth.service'

const router: Router = Router()
const authService = new AuthService()

/**
 * Auth middleware. Loads the admin/admin data in res.locals
 */
router.use(async (req, res, next) => {
  try {
    const token: string = req.header('authorization')?.replace(/^ *bearer */i, '')

    if (!token) {
      return next()
    }

    const { user, userType } = await authService.getSessionByToken(token)
    logger.debug({ user, userType }, 'authMiddleware')

    switch (user) {
      case user as Admin:
        res.locals.adminId = user.adminId
        res.locals.admin = user
        res.locals.token = token
        res.locals.userType = UserType.ADMIN
        return next()
      case user as User:
        res.locals.userId = user.userId
        res.locals.user = user
        res.locals.token = token
        res.locals.userType = UserType.USER
        return next()
    }
  } catch (err) {
    next(err)
  }
})

export const MiddlewareRouter: Router = router
