const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware para validar o token JWT enviado no header Authorization
function authenticateToken(req, res, next) {
  // Pega o token do header Authorization (formato: "Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Se não tiver token, retorna erro 401
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token inválido ou expirado
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Armazena os dados do usuário no request para usar nas próximas rotas
    req.user = { id: user.id, email: user.email };
    next();
  });
}

module.exports = authenticateToken;
