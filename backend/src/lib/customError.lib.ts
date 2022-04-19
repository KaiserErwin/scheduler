import { customErrors } from '../enums/error.enum';

/* eslint-disable*/
export class CustomError extends Error {
  public errorCode: number;
  public data: any;
  public message: string;
  public statusCode: number;

  constructor(errorCode: number,  data: any = undefined) {
    super(customErrors[errorCode].message);
    this.errorCode = errorCode;
    this.data = data;
    this.message = customErrors[errorCode].message;
    this.statusCode = customErrors[errorCode].statusCode;
  }
}
/* eslint-enable */

export default CustomError;
