require('dotenv').config();
const express = require('express');
const { sequelize } = require('./db');
const contactsRouter = require('./routes/contacts');
const Contact = require('./models/contact');

const app = express();
app.use(express.json());
app.use('/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao DB RDS');
    await sequelize.sync(); // cria a tabela se não existir
    app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
  } catch (err) {
    console.error('Erro ao conectar DB', err);
  }
})();
