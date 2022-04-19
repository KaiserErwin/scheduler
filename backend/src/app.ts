import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import CustomError from './lib/customError.lib';
import logger from './lib/logger.lib';
import { customErrors } from './enums/error.enum';
import { APIResponse } from './lib/APIResponse.lib';
import sequelize from './model/index';
import { routes } from './router';

const exceptionsMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    logger.error({ err });
    const httpStatus = customErrors[err.errorCode] && customErrors[err.errorCode].statusCode;

    return res.status(httpStatus || 500).send(new APIResponse(false, err.data, err.errorCode));
  }

  logger.error(err)
  res.status(500)

  return res.send(new APIResponse(false));
};

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  public async connectToDatabase() {
    try {
      await sequelize().authenticate();
      logger.info('database_connection_succesful');
    } catch (error) {
      logger.error(error, 'database_connection_failed');
      throw error;
    }
  }

  private middleware() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
  }

  private routes() {
    this.app.use('/api', routes);
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404);
      res.send(false);
    });
    this.app.use(exceptionsMiddleware);
  }
}

export default App;
