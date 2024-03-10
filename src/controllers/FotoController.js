import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  /**
   * Método que "cria" a foto enviada
   * Caso a foto enviada não seja png ou jpg, gera erro.
   * Aguarda a foto ser criada na BD com base nos campos originalfile e filename do corpo do arquivo e aluno_id do corpo da requisição.
   * Caso o aluno(ID) não seja encontrado, carrega uma mensagem no corpo da requisição.
  */
  async store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        res.status(400).json({
          errors: [error.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const foto = await Foto.create({ originalname, filename, aluno_id });
        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não encontrado.'],
        });
      }
    });
  }
}

export default new FotoController();
