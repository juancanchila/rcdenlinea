const sequelize = require('../config/db');

describe('Conexión a la base de datos', () => {
  test('Debe conectarse correctamente', async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });
});