const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

// Modelo Produto
const Produto = db.define('Produto', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,  // Inteiro sem sinal
    autoIncrement: true,                // Auto incrementa o id
    primaryKey: true,                   // Chave primária
  },
  nome: {
    type: DataTypes.STRING,             // Nome do produto
    allowNull: false,                   // Campo obrigatório
  },
  preco: {
    type: DataTypes.FLOAT,              // Preço do produto, número decimal
    allowNull: false,
  },
  categoriaId: {
    type: DataTypes.INTEGER.UNSIGNED,  // Relaciona com a categoria
    allowNull: false,
    references: {
      model: 'categorias',              // Chave estrangeira para tabela categorias
      key: 'id',
    },
  },
}, {
  tableName: 'produtos',                // Nome da tabela
  timestamps: true,                     // Campos createdAt e updatedAt
});

module.exports = Produto;
