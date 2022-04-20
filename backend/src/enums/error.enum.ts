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

  export enum User {
    generic = 3000,
    userNotExist,
    userAlreadyExists,
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

customErrors[ApiError.User.userNotExist] = {
  message: 'User not exist',
  statusCode: 404
}

customErrors[ApiError.User.userAlreadyExists] = {
  message: 'User already exists',
  statusCode: 409
}


export { customErrors };
