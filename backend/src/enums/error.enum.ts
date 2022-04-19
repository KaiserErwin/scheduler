export namespace ApiError {
  export enum Auth {
    generic = 1000,
    unauthorized,
    badAuth,
    sessionNotExist
  }

  export enum Admin {
    generic = 2000,
    adminNotExist,
    adminAlreadyExists
  }
}

const customErrors = [];

customErrors[ApiError.Auth.unauthorized] = {
  message: 'Unauthorized',
  statusCode: 401,
}
customErrors[ApiError.Auth.badAuth] = {
  message: 'Bad auth',
  statusCode: 400,
}

customErrors[ApiError.Auth.sessionNotExist] = {
  message: 'Session not exist',
  statusCode: 401,
}

customErrors[ApiError.Admin.adminNotExist] = {
  message: 'Admin not exist',
  statusCode: 404
}

customErrors[ApiError.Admin.adminAlreadyExists] = {
  message: 'Admin already exists',
  statusCode: 409
}

export { customErrors };
