const { Sequelize } = require('sequelize');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false,
      },
    })
  : null;

const connectDatabase = async () => {
  if (!sequelize) {
    console.warn('DATABASE_URL not set — running in mock mode without PostgreSQL.');
    return false;
  }

  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error.message);
    return false;
  }
};

module.exports = { sequelize, connectDatabase };
