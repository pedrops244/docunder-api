import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  /**
   * Método que cria o token de autenticação.
   * Caso o campo email e/ou password não sejam enviados, gera o erro.
   * Aguarda o email ser buscado na BD com base no enviado no corpo da requisição.
   * Aguarda o método passswordIsValid verificar se a senha é a mesma no BD.
   * Caso haja erros, lista e carrega na requisição da página.
   * Se o id e o email do usuário forem válidos, gera o token de autenticação.
  */
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe.'],
      });
    }
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida.'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
