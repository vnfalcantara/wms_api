const UserController = require("../controllers/user.controller");
const user = new UserController();

module.exports = (scope) => {
  const { app } = scope;
  const basePath = "/user";

  app.post(basePath, user.insert); // INSERE DADO
  app.get(basePath, user.find); // BUSCA TODOS OS DADOS
  app.get(`${basePath}/count`, user.count); // CONTA QUANTOS DADOS TEM
  app.get(`${basePath}/:id`, user.findOne); // BUSCA DADO DE UM USUARIO
  app.put(`${basePath}/:id`, user.update); // ATUALIZA UM USUARIO
  app.delete(`${basePath}/:id`, user.remove); // REMOVE UM USUARIO
};
