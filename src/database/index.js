import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';

// Models criados.
const models = [User];

// Criação da conexão entre os models criado e a BD.
const connection = new Sequelize(databaseConfig);
models.forEach((model) => model.init(connection));

// Se algum dos models tiver o método associate, o mesmo é executado na conexão.
models.forEach((model) => model.associate && model.associate(connection.models));
