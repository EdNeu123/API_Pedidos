require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const cors = require('cors');
const { db } = require('./config/database'); // Importa a instância do Sequelize (conexão com o banco)

// Importa os modelos definidos na pasta models via index.js
const { Usuario, Categoria, Produto, Pedido, PedidoProduto } = require('./models');

// Importa o Swagger UI e a especificação gerada para documentação da API
const { swaggerUi, swaggerSpec } = require('./swagger');

// Importa as rotas específicas de cada entidade
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(cors()); // Habilita CORS para permitir requisições externas
app.use(express.json()); // Permite que o Express entenda requisições com JSON no body

// Rota para acessar a documentação da API gerada pelo Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define as rotas principais da API com seus respectivos paths
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);

db.sync()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`API rodando em http://localhost:${process.env.PORT}/api-docs/`)
    );
  })
  .catch(console.error); // Caso haja erro na conexão/sincronização, exibe no console
