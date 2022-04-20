import { Request, Response, NextFunction } from 'express';
import { APIResponse } from 'lib/APIResponse.lib';

import { ApiError } from '../enums/error.enum';
import { UserType } from '../enums/userType.enum';
import CustomError from '../lib/customError.lib';
import logger from '../lib/logger.lib';
import { AuthService } from '../services/auth.service';

const authService: AuthService = new AuthService();
/**
 * AuthController.
 */
export class AuthController {
  /**
   * @type {AuthService}
   */

  /**
   * login.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, userType } = req.body;
      const userTypeParsed: UserType = (UserType as any)[userType];

      if (!password) {
        throw new CustomError(ApiError.Auth.badAuth);
      }

      const { user, token } = await authService.login(email, password, userTypeParsed);

      res.send(new APIResponse(true, { user, token }));
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
}
