import { AttendDTO } from '../types/attend/model';
import Attend from '../model/attend.model';
import UserService from './user.service';
import CustomError from '../lib/customError.lib';
import { ApiError } from '../enums/error.enum';

/**
 * AttendService.
 */
export class AttendService {
  /**
   * createAttend.
   *
   * @param {string} userId
   * @param {string} eventId
   * @returns {Promise<AttendDTO>}
   */
  public async createAttend(userId: string, eventId: string): Promise<AttendDTO> {
    const attend = await Attend.create({
      eventId,
      userId,
    });

    return attend;
  }

  /**
   * getAttendByUserId.
   *
   * @param {string} attendId
   * @param {string} userId
   * @returns {Promise<AttendDTO>}
   */
  public async getAttendByUserId(attendId: string, userId: string): Promise<AttendDTO> {
    await new UserService().getUserById(userId);

    const attend = await Attend.findOne({
      where: {
        userId,
        attendId
      },
    });

    if (!attend) {
      throw new CustomError(ApiError.Attend.attendNotExist)
    }

    return attend;
  }

  /**
   * getAttendByAttendId.
   *
   * @param {string} attendId
   * @returns {Promise<AttendDTO>}
   */
  public async getAttendByAttendId(attendId: string): Promise<AttendDTO> {
    const attend = await Attend.findOne({
      where: {
        attendId
      },
    });

    if (!attend) {
      throw new CustomError(ApiError.Attend.attendNotExist)
    }

    return attend;
  }

  /**
   * deleteAttend.
   *
   * @param {string} attendId
   * @returns {Promise<Boolean>}
   */
  public async deleteAttend(attendId: string): Promise<Boolean> {
    await this.getAttendByAttendId(attendId);

    Attend.destroy({
      where: {
        attendId
      },
    });

    return true;
  }
}
