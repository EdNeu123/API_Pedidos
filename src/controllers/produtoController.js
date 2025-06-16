// src/controllers/produtoController.js
const Produto = require('../models/produto');
const PedidoProduto = require('../models/pedidoProduto');

exports.listarTodos = async (_req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
};

exports.buscarPorId = async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(produto);
};

exports.criar = async (req, res) => {
  const { nome, preco, categoriaId } = req.body;
  const produto = await Produto.create({ nome, preco, categoriaId });
  res.status(201).json(produto);
};

exports.atualizar = async (req, res) => {
  const { nome, preco, categoriaId } = req.body;
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  produto.nome = nome || produto.nome;
  produto.preco = preco || produto.preco;
  produto.categoriaId = categoriaId || produto.categoriaId;
  await produto.save();
  res.json(produto);
};

exports.deletar = async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  const count = await PedidoProduto.count({ where: { produtoId: produto.id } });
  if (count > 0) {
    return res.status(409).json({ message: 'Não é possível deletar: produto em pedidos ativos' });
  }
  await produto.destroy();
  res.json({ message: 'Produto deletado com sucesso' });
};
