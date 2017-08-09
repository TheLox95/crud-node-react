import * as Sequelize from "sequelize";

export const Database = new Sequelize('product_db', process.env.DBUSER, process.env.DBPASS, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

Database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: string) => {
    console.error('Unable to connect to the database: ', err);
  });