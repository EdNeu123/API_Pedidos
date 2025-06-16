const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

// Modelo Pedido
const Pedido = db.define('Pedido', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'usuarios',                // Chave estrangeira para usuário
      key: 'id',
    },
  },
}, {
  tableName: 'pedidos',
  timestamps: true,
});

module.exports = Pedido;
