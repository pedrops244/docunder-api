import User from '../models/User';

class UserController {
  /**
   * Método que cria o usuário.
   * Aguarda o usuário ser criado na BD com base nos dados enviados no corpo da requisição.
   * Carrega o usuário criado exibindo somente os campos: id, nome e email na requisição da página.
   * Caso haja erros, lista e carrega na requisição da página.
   */
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  /**
   * Método que lista todos os usuários.
   * Carrega todos os usuários exibindo os campos descritos no attibutes em ordem descresente na requisição da página.
   * Caso haja erros, retorna null.
   */
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email'],
        order: [['id', 'DESC']],
      });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  /**
   * Método que lista cada usuário separadamente.
   * Verifica se o ID existe e/ou é válido.
   * Aguarda o usuário ser buscado na BD com base no ID.
   * Carrega o aluno(Pelo ID) exibindo os campos descritos no attibutes em ordem descresente na requisição da página.
   * Caso haja erros, lista e carrega na requisição da página.
   */
  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID não existe ou inválido!'],
        });
      }
      const user = await User.findByPk(id, {
        attributes: ['id', 'nome', 'email'],
        order: [['id', 'DESC']],
      });
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }
      const { nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  /**
   * Método que atualiza cada usuário.
   * Aguarda o usuário ser buscado na BD com base no ID enviado na requisição.
   * Verifica se o usuário existe e/ou é válido.
   * Aguarda o usuário ser editado na BD com base nos dados enviados no corpo da requisição.
   * Carrega o usuário editado exibindo os campos id, nome e email na requisição da página.
   * Caso haja erros, lista e carrega na requisição da página.
   */
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado.'],
        });
      }
      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  /**
   * Método que deleta cada usuário.
   * Aguarda o usuário ser buscado na BD com base no ID enviado na requisição.
   * Verifica se o ID existe e/ou é válido.
   * Aguarda o usuário ser deletado na BD com base nos dados enviados no corpo da requisição.
   * Carrega uma mensagem de deletado na requisição da página.
   * Caso haja erros, lista e carrega na requisição da página.
   */
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado.'],
        });
      }
      await user.destroy();
      return res.json('Usuário deletado com sucesso! Faça login ou crie sua conta novamente.');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
