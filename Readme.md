# API RESTful com Node.js, Express, Sequelize, JWT e Swagger

Este projeto consiste em uma API RESTful desenvolvida com Node.js, utilizando o framework Express, Sequelize como ORM, autenticação baseada em JWT e documentação gerada com Swagger.

## Tecnologias Utilizadas

## Tecnologias Utilizadas

<p float="left" style="display: flex; gap: 12px; align-items: center;">
  <img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" alt="Node.js" width="40" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express" width="40" />
  <img src="https://sequelize.org/img/logo.svg" alt="Sequelize" width="40" />
  <img src="https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" alt="MySQL" width="40" />
  <img src="https://jwt.io/img/pic_logo.svg" alt="JWT" width="40" />
  <img src="https://swagger.io/images/swagger-logo.svg" alt="Swagger" width="40" />
  <img src="https://raw.githubusercontent.com/motdotla/dotenv/main/logo.svg" alt="dotenv" width="40" />
  <img src="https://raw.githubusercontent.com/kelektiv/node.bcrypt.js/develop/logo/bcrypt-logo.png" alt="bcrypt" width="40" />
  <img src="https://avatars.githubusercontent.com/u/23054190?s=200&v=4" alt="CORS" width="40" />
</p>

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

- `POST /api/users/register` – Cadastro de usuário  
- `POST /api/users/login` – Login e geração de token  
- `GET /api/categories` – Listagem de categorias  
- `POST /api/products` – Cadastro de produto (autenticado)  
- `POST /api/orders` – Realiza pedido (autenticado)  