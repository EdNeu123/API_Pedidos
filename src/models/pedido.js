const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

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
      model: 'usuarios',
      key: 'id',
    },
  },
}, {
  tableName: 'pedidos',
  timestamps: true,
});

Pedido.associate = function(models) {
  Pedido.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

  Pedido.belongsToMany(models.Produto, {
    through: models.PedidoProduto,
    foreignKey: 'pedidoId',
    otherKey: 'produtoId',
    as: 'produtos',
  });
};

module.exports = Pedido;
