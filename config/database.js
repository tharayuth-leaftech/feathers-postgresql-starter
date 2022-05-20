require('dotenv').config();
// eslint-disable-next-line
const { DB_USER, DB_PWD, DB_NAME, DB_HOST, DB_PORT, DB_LOGGING, DB_SSL } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: DB_LOGGING === 'TRUE'? true: false,
    ssl: DB_SSL === 'TRUE'? true: false,
    dialectOptions: {
        ssl: DB_SSL === 'TRUE'? true: false
    }
  },
  test: {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: DB_LOGGING === 'TRUE'? true: false,
    ssl: DB_SSL === 'TRUE'? true: false,
    dialectOptions: {
        ssl: DB_SSL === 'TRUE'? true: false
    }
  },
  production: {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: DB_LOGGING === 'TRUE'? true: false,
    ssl: DB_SSL === 'TRUE'? true: false,
    dialectOptions: {
        ssl: DB_SSL === 'TRUE'? true: false
    }
  },
};