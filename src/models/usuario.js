const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

// Definição do modelo Usuario
const Usuario = db.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,    // Tipo inteiro
    autoIncrement: true,        // Auto incrementa a cada novo registro
    primaryKey: true,           // Chave primária da tabela
  },
  nome: {
    type: DataTypes.STRING,     // Campo do tipo string
    allowNull: false,           // Não permite valor nulo
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,               // Garante que o email seja único na tabela
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',        // Nome da tabela no banco
  timestamps: true,             // Cria campos createdAt e updatedAt automaticamente
});

module.exports = Usuario;
