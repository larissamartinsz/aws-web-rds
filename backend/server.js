const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db'); // importa conexão
const contactsRouter = require('./routes/contacts'); // importa rotas

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// registra a rota
app.use('/contacts', contactsRouter);

// rota raiz só pra teste
app.get('/', (req, res) => {
  res.send('API está no ar 🚀');
});

// conecta no banco e só então inicia servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar no banco', err);
});
