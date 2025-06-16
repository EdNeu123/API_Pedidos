const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/usuarioController');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações com usuários
 */

/**
 * @swagger
 * /api/usuarios/cadastro:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *       '409':
 *         description: Email já cadastrado
 */

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       '200':
 *         description: Retorna token JWT
 *       '401':
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /api/usuarios/perfil:
 *   get:
 *     summary: Retorna perfil do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil retornado
 *       '401':
 *         description: Token ausente ou inválido
 */

/**
 * @swagger
 * /api/usuarios/perfil:
 *   put:
 *     summary: Atualiza perfil do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Perfil atualizado
 *       '404':
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /api/usuarios/perfil/senha:
 *   put:
 *     summary: Altera a senha do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Senha alterada
 *       '401':
 *         description: Senha atual incorreta
 */

/**
 * @swagger
 * /api/usuarios/perfil:
 *   delete:
 *     summary: Deleta conta do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Conta deletada
 */


router.post('/cadastro', userController.cadastrar);
router.post('/login', userController.login);

// Rotas protegidas abaixo
router.use(auth);

router.get('/perfil', userController.perfil);
router.put('/perfil', userController.atualizarPerfil);
router.put('/perfil/senha', userController.alterarSenha);
router.delete('/perfil', userController.deletarConta);

module.exports = router;
