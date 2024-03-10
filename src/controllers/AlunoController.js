import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  /**
   * Método que cria o aluno.
   * Aguarda o aluno ser criado na BD com base nos dados enviados no corpo da requisição.
   * Carrega o aluno criado na requisição da página.
   * Caso haja erros, lista e carrega na requisição da página.
   */
  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  /**
   * Método que lista todos os alunos
   * Carrega todos os alunos exibindo os campos descritos no attibutes em ordem descresente na requisição da página.
   * Exibe as fotos do aluno por ordem descrescente.
   * Caso haja erros, retorna null.
   */
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });
      return res.json(alunos);
    } catch (e) {
      return res.json(null);
    }
  }

  /**
   * Método que lista cada aluno separadamente.
   * Verifica se o ID existe e/ou é válido.
   * Aguarda o aluno ser buscado na BD com base no ID.
   * Carrega o aluno(Pelo ID) exibindo os campos descritos no attibutes em ordem descresente na requisição da página.
   * Exibe as fotos do aluno por ordem descrescente.
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

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  /**
   * Método que atualiza cada aluno.
   * Verifica se o ID existe e/ou é válido.
   * Aguarda o aluno ser buscado na BD com base no ID.
   * Aguarda o aluno ser editado na BD com base nos dados enviados no corpo da requisição.
   * Carrega o aluno editado exibindo os campos id, nome, sobrenome, email, idade, peso, altura na requisição da página.
   * Caso haja erros, lista e carrega na requisição da página.
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID não existe ou inválido!'],
        });
      }

      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);
      const {
        nome, sobrenome, email, idade, peso, altura,
      } = alunoAtualizado;

      return res.json({
        id, nome, sobrenome, email, idade, peso, altura,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  /**
   * Método que deleta cada aluno.
   * Verifica se o ID existe e/ou é válido.
   * Aguarda o aluno ser buscado na BD com base no ID.
   * Aguarda o aluno ser deletado na BD com base nos dados enviados no corpo da requisição.
   * Carrega uma mensagem de deletado na requisição da página.
   * Caso haja erros, lista e carrega na requisição da página.
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID não existe ou inválido!'],
        });
      }

      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }
      await aluno.destroy();
      return res.json('Aluno deletado com sucesso!');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
