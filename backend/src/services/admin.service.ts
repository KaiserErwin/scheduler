import { AdminRegisterRequest, AdminUpdateRequest } from '../types/admin/request';
import Admin from '../model/admin.model';
import { AdminDTO } from '../types/admin/model';
import { hashPassword, comparePassword } from '../utils/bcrypt.utils';
import CustomError from '../lib/customError.lib';
import { ApiError } from '../enums/error.enum';
import logger from 'lib/logger.lib';

/**
 * AdminService.
 */
export class AdminService {
  /**
   * Create Admin
   * @param {AdminRegisterRequest} newAdmin
   * @returns {Promise<AdminDTO>}
   * */
  public async createAdmin(newAdmin: AdminRegisterRequest): Promise<AdminDTO> {
    const existingAdmin = await Admin.findOne({
      where: {
        email: newAdmin.email,
      },
    });

    if (existingAdmin) {
      throw new CustomError(ApiError.Admin.adminAlreadyExists);
    }

    const hashedPassword = await hashPassword(newAdmin.password);

    const admin = await Admin.create({
      ...newAdmin,
      password: hashedPassword,
    });

    delete admin.password;

    return admin;
  }

  /**
   * getAdminById.
   *
   * @param {string} adminId
   * @returns {Promise<AdminDTO>}
   */
  public async getAdminById(adminId: string): Promise<AdminDTO> {
    const admin = await Admin.scope('data').findByPk(adminId);

    if (!admin) {
      throw new CustomError(ApiError.Admin.adminNotExist);
    }

    return admin;
  }

  /**
   * getAdminByEmail.
   *
   * @param {string} email
   */
  public async getAdminByEmail(email: string) {
    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new CustomError(ApiError.Admin.adminNotExist);
    }

    return admin;
  }

  /**
   * updateAdmin.
   *
   * @param {string} adminId
   * @param {AdminUpdateRequest} newAdmin
   * @returns {Promise<AdminDTO>}
   */
  public async updateAdmin(adminId: string, newAdmin: AdminUpdateRequest): Promise<AdminDTO> {
    const admin = await Admin.findOne({
      where: {
        adminId,
      },
    });

    if (!admin) {
      throw new CustomError(ApiError.Admin.adminNotExist);
    }

    const adminUpdated = await Admin.update(newAdmin, {
      where: {
        adminId,
      },
      returning: true,
    });

    return adminUpdated[1][0];
  }
}

export default AdminService;
