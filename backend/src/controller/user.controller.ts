import { Request, Response, NextFunction } from 'express';
import { UserRegisterRequest } from '../types/user/request';
import { UserService } from '../services/user.service';
import { UserDTO } from '../types/user/model';
import { APIResponse } from '../lib/APIResponse.lib';
import CustomError from '../lib/customError.lib';
import { ApiError } from '../enums/error.enum';

const userService: UserService = new UserService();

/**
 * UserController.
 */
export class UserController {
  /**
   * createUser.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser: UserRegisterRequest = req.body;

      const user: UserDTO = await userService.createUser(newUser);

      res.send(new APIResponse(true, user));
    } catch (err) {
      next(err);
    }
  }
  /**
   * getUserById.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      if (+userId !== +res.locals.userId) {
        throw new CustomError(ApiError.Auth.unauthorized);
      }

      const user = await userService.getUserById(userId);

      res.send(new APIResponse(true, user));
    } catch (err) {
      next(err);
    }
  }

  /**
   * updateUser.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const newUser = req.body;

      if (+userId !== +res.locals.userId) {
        throw new CustomError(ApiError.Auth.unauthorized);
      }

      const user = await userService.updateUser(userId, newUser);

      res.send(new APIResponse(true, user));
    } catch (err) {
      next(err);
    }
  }
}
