const Categoria = require('../models/categoria');
const Produto = require('../models/produto');

// Retorna todas as categorias cadastradas
exports.listarTodas = async (_req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
};

// Busca uma categoria pelo ID passado na URL
exports.buscarPorId = async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
  res.json(categoria);
};

// Cria uma nova categoria com o nome enviado no corpo da requisição
exports.criar = async (req, res) => {
  const { nome } = req.body;
  const categoria = await Categoria.create({ nome });
  res.status(201).json(categoria);
};

// Atualiza o nome de uma categoria existente
exports.atualizar = async (req, res) => {
  const { nome } = req.body;
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });

  categoria.nome = nome || categoria.nome; // mantém o nome atual se não enviar novo
  await categoria.save();

  res.json(categoria);
};

// Deleta uma categoria pelo ID, só se não existir produto vinculado a ela
exports.deletar = async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });

  // Conta produtos que usam essa categoria
  const count = await Produto.count({ where: { categoriaId: categoria.id } });
  if (count > 0) {
    return res.status(409).json({ message: 'Não é possível deletar: existem produtos vinculados' });
  }

  await categoria.destroy();
  res.json({ message: 'Categoria deletada com sucesso' });
};
