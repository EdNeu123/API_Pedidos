const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Cadastro de novo usuário
exports.cadastrar = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se já existe usuário com o email informado
    if (await Usuario.findOne({ where: { email } })) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    // Gera um salt e cria o hash da senha para segurança
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Cria o usuário no banco com a senha já criptografada
    const usuario = await Usuario.create({ nome: name, email, senha: hash });

    // Gera token JWT válido por 1 dia
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Retorna dados do usuário e token para autenticação
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, token });
  } catch (err) {
    // Em caso de erro, responde com status 500 e mensagem
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

// Login do usuário existente
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    const usuario = await Usuario.findOne({ where: { email } });

    // Se não existir ou senha for incorreta, retorna erro
    if (!usuario || !(await bcrypt.compare(password, usuario.senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Cria o payload e gera token JWT
    const payload = { id: usuario.id, email: usuario.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // Retorna o token para o cliente
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

// Busca perfil do usuário logado
exports.perfil = async (req, res) => {
  try {
    // Busca usuário pelo id armazenado no req.user pelo middleware de autenticação
    const usuario = await Usuario.findByPk(req.user.id, { attributes: ['id', 'nome', 'email'] });
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

// Atualiza nome e email do usuário logado
exports.atualizarPerfil = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Busca o usuário pelo id para alterar os dados
    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Atualiza os campos somente se foram enviados novos valores
    usuario.nome = name || usuario.nome;
    usuario.email = email || usuario.email;

    // Salva as alterações no banco
    await usuario.save();

    res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

// Altera a senha do usuário logado
exports.alterarSenha = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Busca usuário para validar senha atual
    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Verifica se a senha atual está correta
    if (!(await bcrypt.compare(oldPassword, usuario.senha))) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }

    // Gera novo hash para a nova senha
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(newPassword, salt);

    // Salva a nova senha no banco
    await usuario.save();

    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

// Deleta a conta do usuário logado
exports.deletarConta = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Remove o usuário do banco
    await usuario.destroy();

    res.json({ message: 'Conta deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};
