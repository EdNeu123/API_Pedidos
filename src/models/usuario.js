const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const Usuario = db.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
});

// Função para fazer associações
Usuario.associate = function(models) {
  Usuario.hasMany(models.Pedido, { foreignKey: 'usuarioId', as: 'pedidos' });
};

module.exports = Usuario;
