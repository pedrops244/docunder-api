import jwt from 'jsonwebtoken';
import User from '../models/User';
// Middleware que verifica se o usuário está logado através do token
export default async (req, res, next) => {
  const { authorization } = req.headers;
  // authorization = token
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    // Verifica se o token do usuário é existente
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Verifica se o id e email são o mesmo da BD, caso não seja, gera erro.
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido.'],
      });
    }
    // Se o token for válido, atrela o id e email na requisição para saber qual usuário está fazendo login.
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
