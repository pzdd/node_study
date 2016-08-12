module.exports = function(app){
  var autenticar = require('./../middleware/autenticador'),
  home = app.controllers.home;
  app.get('/home', autenticar,home.index);
  app.post('/cadastrar', autenticar, home.cadastro);
  app.get('/remove/:id',autenticar, home.remover);
  app.get('/edita/:id',autenticar, home.detalhar);
  app.post('/editar',autenticar, home.edita);
};
