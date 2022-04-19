import { AdminRegisterRequest } from '../types/admin/request';
import Admin from '../model/admin.model';
import { AdminDTO } from '../types/admin/model';
import { hashPassword, comparePassword } from '../utils/bcrypt.utils';
import CustomError from '../lib/customError.lib';
import { ApiError } from '../enums/error.enum';

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

    delete admin.password

    return admin;
  }

  public async getAdminById(adminId: string): Promise<AdminDTO> {
    const admin = await Admin.scope('data').findByPk(adminId);

    if (!admin) {
      throw new CustomError(ApiError.Admin.adminNotExist);
    }

    return admin;
  }

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
}

export default AdminService;
