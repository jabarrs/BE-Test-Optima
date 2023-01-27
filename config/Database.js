import { Sequelize } from 'sequelize';

const db = new Sequelize('data_api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
