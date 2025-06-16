const Pedido = require('../models/pedido');
const Produto = require('../models/produto');
const PedidoProduto = require('../models/pedidoProduto');

// Cria um novo pedido para o usuário logado
exports.criarPedido = async (req, res) => {
  try {
    const usuarioId = req.user.id; // pega o id do usuário autenticado
    const { itens } = req.body; // espera um array de itens com produtoId e quantidade

    // Cria o pedido com o id do usuário
    const pedido = await Pedido.create({ usuarioId });

    // Mapeia os itens para criar a relação no PedidoProduto
    const pedidoProdutos = itens.map(i => ({
      pedidoId: pedido.id,
      produtoId: i.produtoId,
      quantidade: i.quantidade || 1, // se quantidade não vier, usa 1
    }));
    // Insere todos os itens do pedido na tabela intermediária
    await PedidoProduto.bulkCreate(pedidoProdutos);

    // Busca o pedido criado incluindo os produtos e suas quantidades
    const novoPedido = await Pedido.findByPk(pedido.id, {
      include: [{
        model: Produto,
        as: 'produtos',
        through: { attributes: ['quantidade'] }
      }]
    });

    // Retorna o pedido criado com status 201 (criado)
    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pedido', error: err.message });
  }
};

// Lista todos os pedidos do usuário logado
exports.listarPorUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    // Busca todos os pedidos do usuário incluindo os produtos relacionados
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

// Busca um pedido específico pelo ID, garantindo que pertence ao usuário
exports.buscarPorId = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    // Busca pedido pelo id e usuário, incluindo os produtos
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

// Cancela um pedido deletando ele e seus itens associados
exports.cancelarPedido = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    // Verifica se o pedido existe e pertence ao usuário
    const pedido = await Pedido.findOne({ where: { id: req.params.id, usuarioId } });
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });

    // Deleta os itens do pedido da tabela intermediária
    await PedidoProduto.destroy({ where: { pedidoId: pedido.id } });

    // Deleta o pedido em si
    await pedido.destroy();

    res.json({ message: 'Pedido cancelado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cancelar pedido', error: err.message });
  }
};
