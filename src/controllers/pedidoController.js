const Pedido = require('../models/pedido');
const Produto = require('../models/produto');
const PedidoProduto = require('../models/pedidoProduto');

exports.criarPedido = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { itens } = req.body; // itens: [{ produtoId, quantidade }]

    const pedido = await Pedido.create({ usuarioId });

    const pedidoProdutos = itens.map(i => ({
      pedidoId: pedido.id,
      produtoId: i.produtoId,
      quantidade: i.quantidade || 1,
    }));
    await PedidoProduto.bulkCreate(pedidoProdutos);

    const novoPedido = await Pedido.findByPk(pedido.id, {
      include: [{
        model: Produto,
        as: 'produtos',
        through: { attributes: ['quantidade'] }
      }]
    });
    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pedido', error: err.message });
  }
};

exports.listarPorUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const pedidos = await Pedido.findAll({
      where: { usuarioId },
      include: [{
        model: Produto,
        as: 'produtos',
        through: { attributes: ['quantidade'] }
      }]
    });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const pedido = await Pedido.findOne({
      where: { id: req.params.id, usuarioId },
      include: [{
        model: Produto,
        as: 'produtos',
        through: { attributes: ['quantidade'] }
      }]
    });
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error: err.message });
  }
};

exports.cancelarPedido = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const pedido = await Pedido.findOne({ where: { id: req.params.id, usuarioId } });
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });

    await PedidoProduto.destroy({ where: { pedidoId: pedido.id } });
    await pedido.destroy();

    res.json({ message: 'Pedido cancelado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cancelar pedido', error: err.message });
  }
};
