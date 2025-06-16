const Produto = require('../models/produto');
const PedidoProduto = require('../models/pedidoProduto');

// Retorna todos os produtos cadastrados
exports.listarTodos = async (_req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
};

// Busca um produto pelo ID informado na URL
exports.buscarPorId = async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(produto);
};

// Cria um novo produto com os dados enviados no corpo da requisição
exports.criar = async (req, res) => {
  const { nome, preco, categoriaId } = req.body;
  const produto = await Produto.create({ nome, preco, categoriaId });
  res.status(201).json(produto);
};

// Atualiza um produto existente, buscando pelo ID e alterando os campos enviados
exports.atualizar = async (req, res) => {
  const { nome, preco, categoriaId } = req.body;
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

  // Atualiza só os campos que vieram no corpo da requisição
  produto.nome = nome || produto.nome;
  produto.preco = preco || produto.preco;
  produto.categoriaId = categoriaId || produto.categoriaId;

  await produto.save();
  res.json(produto);
};

// Deleta um produto pelo ID, só se ele não estiver associado a pedidos ativos
exports.deletar = async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

  // Conta se existem pedidos ativos com esse produto
  const count = await PedidoProduto.count({ where: { produtoId: produto.id } });
  if (count > 0) {
    return res.status(409).json({ message: 'Não é possível deletar: produto em pedidos ativos' });
  }

  // Remove o produto do banco
  await produto.destroy();
  res.json({ message: 'Produto deletado com sucesso' });
};
