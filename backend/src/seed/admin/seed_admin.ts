import csvParser from 'csv-parse/lib/sync';
import fs from 'fs';
import logger from '../../lib/logger.lib';
import path from 'path';

import sequelize from '../../model';
import Admin from '../../model/admin.model';
import { hashPassword } from '../../utils/bcrypt.utils';

export async function seedDbCities() {
  await sequelize().authenticate();
  const transaction = await sequelize().transaction();

  try {
    const admins = parseCSV('/admin.csv');

    for (const newAdmin of admins) {
      const password = await hashPassword(newAdmin.PASSWORD);
      const admin = await Admin.create(
        {
          firstName: newAdmin.FIRST_NAME,
          lastName: newAdmin.LAST_NAME,
          email: newAdmin.EMAIL,
          password,
        },
        { transaction },
      );
      logger.debug({ admin });
    }

    await transaction.commit();
  } catch (err) {
    logger.error({ err });
    await transaction.rollback();
  }
}

function parseCSV(filePath: string) {
  const file = fs.readFileSync(path.resolve(__dirname + filePath)).toString();
  const data = csvParser(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  return data;
}

if (require.main === module) {
  seedDbCities();
}
