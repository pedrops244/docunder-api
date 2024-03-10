import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    // Validação dos dados enviados.
    super.init({
      // Chave nome precisa ter entre 3 e 255 caracteres e caso nao seja envia a msg de erro.
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo nome deve ter entre 3 e 255 caracteres.',
          },
        },
      },
      // Chave email precisa ser única e válida e caso não seja envia a msg de erro.
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe.',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido!',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      // Chave password precisa ter entre 3 e 50 carcteres e não é enviada ao BD e caso nao seja envia a msg de erro.
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'O campo senha deve ter entre 3 e 50 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });
    // Hook que cria um hash na chave password e passa esse valor "criptgrafado" para a chave password_hash
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  // Método que valida se a senha enviada no login é igual a senha da BD.
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
