import { customErrors } from '../enums/error.enum';

export class APIResponse {
  public data: string;
  public result: boolean;
  public errorCode: number;
  public message: string;

  constructor(result: boolean, data?: any, errorCode?: number) {
    this.data = data;
    if (result) {
      this.errorCode = 0;
      this.result = result;
      this.message = null;
    }
    if (errorCode) {
      this.errorCode = errorCode;
      this.message = customErrors[errorCode].message;
      return;
    }
  }
}
