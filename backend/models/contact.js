const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Contact = sequelize.define('Contact', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },       // texto
  email: { type: DataTypes.STRING, allowNull: false },      // texto
  age: { type: DataTypes.INTEGER },                         // número
  joined_on: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // date
  active: { type: DataTypes.BOOLEAN, defaultValue: true }   // boolean
}, {
  tableName: 'contacts',
  timestamps: true
});

module.exports = Contact;
