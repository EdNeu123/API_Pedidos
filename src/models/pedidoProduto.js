const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const PedidoProduto = db.define('PedidoProduto', {
  pedidoId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true, // Definindo como parte da chave primária composta
    references: {
      model: 'pedidos',
      key: 'id',
    },
  },
  produtoId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true, // Definindo como parte da chave primária composta
    references: {
      model: 'produtos',
      key: 'id',
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  tableName: 'pedido_produto',
  timestamps: false,
});

module.exports = PedidoProduto;
