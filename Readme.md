# API RESTful com Node.js, Express, Sequelize, JWT e Swagger

Este projeto consiste em uma API RESTful desenvolvida com Node.js, utilizando o framework Express, Sequelize como ORM, autenticação baseada em JWT e documentação gerada com Swagger.

## Tecnologias Utilizadas

| Tecnologia | Logo |
|------------|------|
| Node.js    | ![Node.js](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg) |
| Express    | ![Express](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png) |
| Sequelize  | ![Sequelize](https://sequelize.org/img/logo.svg) |
| MySQL      | ![MySQL](https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg) |
| JWT        | ![JWT](https://jwt.io/img/pic_logo.svg) |
| Swagger    | ![Swagger](https://swagger.io/images/swagger-logo.svg) |
| dotenv     | ![dotenv](https://raw.githubusercontent.com/motdotla/dotenv/main/logo.svg) |
| bcrypt     | ![bcrypt](https://raw.githubusercontent.com/kelektiv/node.bcrypt.js/develop/logo/bcrypt-logo.png) |
| cors       | ![CORS](https://avatars.githubusercontent.com/u/23054190?s=200&v=4) |

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