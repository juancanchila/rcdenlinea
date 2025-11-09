const sequelize = require('../config/db');
const defineUsuario = require('../models/Usuario');

const Usuario = defineUsuario(sequelize);

describe('Verificación de existencia de usuario', () => {
  test('Debe existir el usuario jlopez en la tabla usuarios', async () => {
    const existe = await Usuario.findOne({ where: { usuario: 'jlopez' } });
    expect(existe).not.toBeNull();
  });
});