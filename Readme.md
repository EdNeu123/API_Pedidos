# API RESTful para controle de pedidos
Este projeto consiste em uma API RESTful para controle de pedidos e produtos, desenvolvida com Node.js, utilizando o framework Express, Sequelize como ORM, autenticação baseada em JWT e documentação gerada com Swagger.

## Tecnologias Utilizadas

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![MySQL](https://img.shields.io/badge/MySQL-00758F?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)](https://swagger.io/)
[![dotenv](https://img.shields.io/badge/dotenv-000000?style=flat&logo=dotenv&logoColor=white)](https://github.com/motdotla/dotenv)
[![bcrypt](https://img.shields.io/badge/bcrypt-262A2D?style=flat&logo=bcrypt&logoColor=white)](https://github.com/kelektiv/node.bcrypt.js)
[![CORS](https://img.shields.io/badge/CORS-61DAFB?style=flat&logo=fastify&logoColor=black)](https://github.com/expressjs/cors)



## Estrutura de Pastas

```
src/
├── config/
│   └── database.js
├── controllers/
│   ├── categoriaController.js
│   ├── pedidoController.js
│   ├── produtoController.js
│   └── usuarioController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── categoria.js
│   ├── index.js
│   ├── pedido.js
│   ├── pedidoProduto.js
│   ├── produto.js
│   └── usuario.js
├── routes/
│   ├── categoriaRoutes.js
│   ├── pedidoRoutes.js
│   ├── produtoRoutes.js
│   └── usuarioRoutes.js
├── server.js
└── swagger.js
```

## Autenticação

A autenticação é realizada por meio de tokens JWT. Para acessar rotas protegidas, inclua o token JWT no cabeçalho da requisição:
Authorization: Bearer <seu_token>

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/EdNeu123/API_Pedidos.git
```

2. Navegue até a pasta:

```bash
cd API_RestFul_JS
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` com o seguinte conteúdo:

```
PORT=3000
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
JWT_SECRET=sua_chave_secreta
```

## Executar a API

Para rodar em modo de desenvolvimento com `nodemon`:

```bash
npm run dev
```

Ou, para rodar normalmente:

```bash
npm start
```

## Documentação Swagger

Acesse a documentação interativa da API:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Rotas Principais

- `POST /api/users/cadastro` – Cadastro de usuário  
- `POST /api/users/login` – Login e geração de token  
- `GET /api/categorias` – Listagem de categorias  
- `POST /api/produtos` – Cadastro de produto (autenticado)  
- `POST /api/pedidos` – Realiza pedido (autenticado)  