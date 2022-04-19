import * as crypto from 'crypto';
import logger from 'lib/logger.lib';

export class CryptoUtils {
  /**
    Generate Random token
    @returns {Promise<string>}
  */
  public async generateToken(): Promise<string> {
    try {
      const token = crypto.randomBytes(45);
      return token.toString('utf8');
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  public async generateSessionToken(): Promise<string> {
    try {
      const token = crypto.randomBytes(45);
      return token.toString('hex');
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
