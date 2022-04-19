import { Request, Response, NextFunction } from 'express';
import { UserType } from '../enums/userType.enum';
import { ApiError } from '../enums/error.enum';
import CustomError from 'lib/customError.lib';

export class MiddlewareService {
  public authorizeRoles(roles: UserType[]) {
    return [
      (req: Request, res: Response, next: NextFunction) => {
        const userRole = (UserType as any)[res.locals.userType];

        if (roles.length && !roles.includes(userRole)) {
          next(new CustomError(ApiError.Auth.unauthorized));
        }

        next();
      },
    ];
  }
}
