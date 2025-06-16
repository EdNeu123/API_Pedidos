const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

// Definição do modelo Categoria
const Categoria = db.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,   // Tipo inteiro
    autoIncrement: true,       // Auto incrementa a cada novo registro
    primaryKey: true,          // Chave primária da tabela
  },
  nome: {
    type: DataTypes.STRING,    // Nome da categoria
    allowNull: false,          // Campo obrigatório
  },
}, {
  tableName: 'categorias',     // Nome da tabela no banco
  timestamps: true,            // Cria campos createdAt e updatedAt automaticamente
});

module.exports = Categoria;
