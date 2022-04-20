import { UserDTO } from '../types/user/model';
import User from '../model/user.model';
import { UserRegisterRequest, UserUpdateRequest } from '../types/user/request';
import CustomError from 'lib/customError.lib';
import { ApiError } from 'enums/error.enum';
import { hashPassword } from 'src/utils/bcrypt.utils';
import logger from 'lib/logger.lib';

/**
 * UserService.
 */
export class UserService {
  /**
   * createUser.
   *
   * @param {UserRegisterRequest} newUser
   * @returns {Promise<UserDTO>}
   */
  public async createUser(newUser: UserRegisterRequest): Promise<UserDTO> {
    const existingUser = await User.findOne({
      where: {
        email: newUser.email,
      },
    });

    if (existingUser) {
      throw new CustomError(ApiError.User.userAlreadyExists);
    }

    const hashedPassword = await hashPassword(newUser.password);

    const user = await User.create({
      ...newUser,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }

  /**
   * getUserById.
   *
   * @param {string} userId
   * @returns {Promise<UserDTO>}
   */
  public async getUserById(userId: string): Promise<UserDTO> {
    const user = await User.scope('data').findByPk(userId);

    if (!user) {
      throw new CustomError(ApiError.User.userNotExist);
    }

    return user;
  }

  /**
   * getUserByEmail.
   *
   * @param {string} email
   */
  public async getUserByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new CustomError(ApiError.User.userNotExist);
    }

    return user;
  }

  /**
   * updateUser.
   *
   * @param {string} userId
   * @param {UserUpdateRequest} newUser
   * @returns {Promise<UserDTO>}
   */
  public async updateUser(userId: string, newUser: UserUpdateRequest): Promise<UserDTO> {
    const user = await User.findOne({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new CustomError(ApiError.User.userNotExist);
    }

    const userUpdated = await User.update(newUser, {
      where: {
        userId,
      },
      returning: true,
    });

    return userUpdated[1][0];
  }
}

export default UserService;
