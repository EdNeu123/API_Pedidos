const Categoria = require('../models/categoria');
const Produto = require('../models/produto');

exports.listarTodas = async (_req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
};

exports.buscarPorId = async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
  res.json(categoria);
};

exports.criar = async (req, res) => {
  const { nome } = req.body;
  const categoria = await Categoria.create({ nome });
  res.status(201).json(categoria);
};

exports.atualizar = async (req, res) => {
  const { nome } = req.body;
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
  categoria.nome = nome || categoria.nome;
  await categoria.save();
  res.json(categoria);
};

exports.deletar = async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
  const count = await Produto.count({ where: { categoriaId: categoria.id } });
  if (count > 0) {
    return res.status(409).json({ message: 'Não é possível deletar: existem produtos vinculados' });
  }
  await categoria.destroy();
  res.json({ message: 'Categoria deletada com sucesso' });
};
