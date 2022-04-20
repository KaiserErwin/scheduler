import { comparePassword } from '../utils/bcrypt.utils';
import { UserType } from '../enums/userType.enum';
import AdminService from './admin.service';
import UserService from './user.service'
import { AdminDTO } from '../types/admin/model';
import CustomError from '../lib/customError.lib';
import { ApiError } from '../enums/error.enum';
import User from '../model/user.model';
import Admin from '../model/admin.model';
import { CryptoUtils } from 'src/utils/crypto.utils';
import Session from '../model/session.model';
import logger from 'lib/logger.lib';

/**
 * IGetSessionByTokenReturn.
 */
export interface IGetSessionByTokenReturn {
  user: any
  userType: UserType
}

const adminService:AdminService = new AdminService()
const userService: UserService = new UserService()

/**
 * AuthService.
 */
export class AuthService {

  /**
   * Get data depending on the type of user
   * @param {string} email
   * @param {UserType} userType
   * @returns {Promise<Admin | User>}
   * */
  private async getUserData(email: string, userType: UserType): Promise<Admin | User> {
    switch (userType) {
      case UserType.ADMIN:
        return await adminService.getAdminByEmail(email);
      case UserType.USER:
        return await User.findOne({
          where: {
            email,
          },
        });
    }
  }

  /**
   * Create Session
   * @param {Admin | User} user
   * @param {UserType} userType
   * @returns {Promise<String>} token
   * */
  private async createSession(user: any, userType: UserType): Promise<String> {
    const token = await new CryptoUtils().generateSessionToken();

    switch (userType) {
      case UserType.ADMIN:
        await Session.create({
          adminId: user.adminId,
          token,
        });
        break;
      case UserType.USER:
        await Session.create({
          userId: user.userId,
          token,
        });
        break;
    }

    return token;
  }

  /**
   * login.
   *
   * @param {string} email
   * @param {string} password
   * @param {UserType} userType
   */
  public async login(email: string, password: string, userType: UserType) {
    const user = await this.getUserData(email, userType);
    const passwordsCompared = await comparePassword(password, user?.password);

    if (!passwordsCompared) {
      throw new CustomError(ApiError.Auth.badAuth);
    }

    const token = await this.createSession(user, userType);

    delete user.password

    return { user, token };
  }

  /**
   * getSessionByToken.
   *
   * @param {string} token
   * @returns {Promise<IGetSessionByTokenReturn>}
   */
  public async getSessionByToken(token: string): Promise<IGetSessionByTokenReturn>{
    const session = await Session.findOne({
      where: {
        token,
      }
    })

    logger.debug({ session })

    if (!session) {
      throw new CustomError(ApiError.Auth.sessionNotExist)
    }

    let user

    if (session['adminId']) {
      user = await adminService.getAdminById(session.adminId.toString())
      return {
        user,
        userType: UserType.ADMIN
      }
    }
    if (session['userId']) {
      user = await userService.getUserById(session.userId.toString())
      return {
        user,
        userType: UserType.USER
      }
    }
  }
}
