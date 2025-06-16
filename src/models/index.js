const Usuario = require('./usuario');
const Categoria = require('./categoria');
const Produto = require('./produto');
const Pedido = require('./pedido');
const PedidoProduto = require('./pedidoProduto');

// Associações

// Usuário 1:N Pedido
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId', as: 'pedidos' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// Categoria 1:N Produto
Categoria.hasMany(Produto, { foreignKey: 'categoriaId', as: 'produtos' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

// Pedido N:N Produto
Pedido.belongsToMany(Produto, {
  through: PedidoProduto,
  foreignKey: 'pedidoId',
  otherKey: 'produtoId',
  as: 'produtos',
});
Produto.belongsToMany(Pedido, {
  through: PedidoProduto,
  foreignKey: 'produtoId',
  otherKey: 'pedidoId',
  as: 'pedidos',
});

module.exports = { Usuario, Categoria, Produto, Pedido, PedidoProduto };
