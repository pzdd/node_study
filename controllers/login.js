module.exports = function(app){
  var Usuario = app.models.usuario;
  var LoginController = {
    index: function(req,res){
        res.render('login/index');
    },
    cadastro: function(req,res){
      var query = {login:req.body.usuario.login};
      Usuario.findOne(query)
      .select('login senha')
      .exec(function(erro,usuario){
        if(usuario){
          console.log('aqui');
          res.render('login/cadastrar',{msg:'usuario já existe'});
        }else{
          Usuario.create(req.body.usuario,function(erro,usuario){
            if(erro){
              res.redirect('/');
            }else{
              req.session.usuario = usuasrio;
              res.redirect('/home');
            }
          });
        }
      });
    },
    telaCadastro: function(req,res){
      res.render('login/cadastrar');
    },
    logar: function(req,res){
      var query = {login:req.body.usuario.login};
      Usuario.findOne(query)
      .select('login senha')
      .exec(function(erro,usuario){
        if(usuario && usuario.senha == req.body.usuario.senha){
          req.session.usuario = usuario;
          res.redirect('/home');
        }else{
          res.redirect('/');
        }
      });
    },
    sair: function(req,res){
      req.session.destroy();
      res.redirect('/');
    }
  };
  return LoginController;
};
