require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config/database');

const Usuario = require('./models/usuario');
const Categoria = require('./models/categoria');
const Produto = require('./models/produto');
const Pedido = require('./models/pedido');
const PedidoProduto = require('./models/pedidoProduto');

const { swaggerUi, swaggerSpec } = require('./swagger');

const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Sincroniza o banco e inicia servidor
db.sync()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`API rodando em http://localhost:${process.env.PORT}/api-docs/`)
    );
  })
  .catch(console.error);
