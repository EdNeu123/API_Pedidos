const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.cadastrar = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await Usuario.findOne({ where: { email } })) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const usuario = await Usuario.create({ nome: name, email, senha: hash });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !(await bcrypt.compare(password, usuario.senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const payload = { id: usuario.id, email: usuario.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id, { attributes: ['id', 'nome', 'email'] });
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.atualizarPerfil = async (req, res) => {
  try {
    const { name, email } = req.body;

    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    usuario.nome = name || usuario.nome;
    usuario.email = email || usuario.email;

    await usuario.save();

    res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.alterarSenha = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    if (!(await bcrypt.compare(oldPassword, usuario.senha))) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }

    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(newPassword, salt);

    await usuario.save();

    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.deletarConta = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    await usuario.destroy();

    res.json({ message: 'Conta deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};
