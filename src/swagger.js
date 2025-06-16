const swaggerJSDoc = require('swagger-jsdoc'); // Importa o swagger-jsdoc para gerar a especificação da API a partir dos comentários
const swaggerUi = require('swagger-ui-express'); // Importa o swagger-ui-express para servir a interface web do Swagger

// Configurações principais do Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Versão do OpenAPI utilizada
    info: {
      title: 'API Atividade JS', // Título da API
      version: '1.0.0', // Versão da API
      description: 'Documentação da API RESTful com Express, Sequelize e JWT' // Descrição breve
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}` } // URL base do servidor (local, porta padrão 3000)
    ],
    components: {
      securitySchemes: {
        bearerAuth: { // Define o esquema de autenticação JWT via Bearer token
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [ // Aplica o esquema de segurança globalmente (todas as rotas protegidas por JWT)
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'] // Arquivos onde o swagger vai buscar os comentários para gerar a documentação
};

// Gera a especificação Swagger com base nas opções
const swaggerSpec = swaggerJSDoc(options);

// Exporta o swagger-ui e a especificação para serem usados no servidor Express
module.exports = { swaggerUi, swaggerSpec };
