module.exports = function(app){
  var login = app.controllers.login;
  app.get('/', login.index);
  app.post('/login', login.logar);
  app.get('/logout', login.sair);
  app.get('/telaCadastro',login.telaCadastro);
  app.post('/cadastro', login.cadastro);
};
