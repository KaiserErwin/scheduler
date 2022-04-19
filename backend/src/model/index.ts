import { Sequelize } from 'sequelize-typescript';
import config from '../config/config'

let sequelizeInstance: Sequelize;

const sequelize = () => {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }
  const models = [`${__dirname}/*.model.ts`];

  sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      timezone: 'Etc/GMT0',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    define: {
      underscored: true,
      freezeTableName: true,
    },
    models,
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.model')).replace(/_/g, '') === member.toLowerCase()
      );
    },
  });

  return sequelizeInstance;
};

export default sequelize;
