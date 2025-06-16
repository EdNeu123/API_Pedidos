const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

// Modelo intermediário para relação N:N entre Pedido e Produto
const PedidoProduto = db.define('PedidoProduto', {
  pedidoId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,                   // Faz parte da chave primária composta
    references: {
      model: 'pedidos',
      key: 'id',
    },
  },
  produtoId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,                   // Faz parte da chave primária composta
    references: {
      model: 'produtos',
      key: 'id',
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 1,                    // Quantidade padrão é 1
  },
}, {
  tableName: 'pedido_produto',         // Nome da tabela intermediária
  timestamps: false,                   // Não possui timestamps
});

module.exports = PedidoProduto;
