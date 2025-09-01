const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <- isso é importante no RDS
    },
  },
  logging: false, // opcional, para não encher o console
});

sequelize.authenticate()
  .then(() => console.log('Conectado ao RDS!'))
  .catch(err => console.error('Erro ao conectar DB:', err));

module.exports = { sequelize };
