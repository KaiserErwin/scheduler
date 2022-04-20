import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger.lib';
import { AdminDTO } from '../types/admin/model';
import { AdminService } from '../services/admin.service';
import { APIResponse } from '../lib/APIResponse.lib';
import CustomError from '../lib/customError.lib';
import { ApiError } from '../enums/error.enum';

const adminService: AdminService = new AdminService();
/**
 * AdminController.
 */
export class AdminController {
  /**
   * createAdmin.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const newAdmin = req.body;

      const admin: AdminDTO = await adminService.createAdmin(newAdmin);

      res.send(new APIResponse(true, admin));
    } catch (err) {
      next(err);
    }
  }

  /**
   * getAdminById.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async getAdminById(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = req.params.adminId;

      if (+adminId !== +res.locals.adminId) {
        throw new CustomError(ApiError.Auth.unauthorized);
      }

      const admin = await adminService.getAdminById(adminId);

      res.send(new APIResponse(true, admin));
    } catch (err) {
      next(err);
    }
  }

  /**
   * updateAdmin.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  public async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = req.params.adminId;
      const newAdmin = req.body;

      if (+adminId !== +res.locals.adminId) {
        throw new CustomError(ApiError.Auth.unauthorized);
      }

      const admin = await adminService.updateAdmin(adminId, newAdmin);

      res.send(new APIResponse(true, admin));
    } catch (err) {
      next(err);
    }
  }
}
