const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const Categoria = db.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categorias',
  timestamps: true,
});

Categoria.associate = function(models) {
  Categoria.hasMany(models.Produto, { foreignKey: 'categoriaId', as: 'produtos' });
};

module.exports = Categoria;
