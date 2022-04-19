import dotenv from 'dotenv';
import App from './app';
dotenv.config();

import config from './config/config';
import logger from './lib/logger.lib';

const port = config.port;
const app = new App();

app.app.listen(port, () => logger.info(`Server running on port ${port}`));

function connectDatabase() {
  try {
    app.connectToDatabase();
    logger.info('Connected to database ...');
  } catch (err) {
    logger.error(err, 'CONNECTION ERROR');
    logger.info('Trying to connect again');
    setTimeout(connectDatabase, 10000);
  }
}

connectDatabase()
