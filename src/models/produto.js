const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const Produto = db.define('Produto', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoriaId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'categorias',
      key: 'id',
    },
  },
}, {
  tableName: 'produtos',
  timestamps: true,
});

Produto.associate = function(models) {
  Produto.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

  Produto.belongsToMany(models.Pedido, {
    through: models.PedidoProduto,
    foreignKey: 'produtoId',
    otherKey: 'pedidoId',
    as: 'pedidos',
  });
};

module.exports = Produto;
