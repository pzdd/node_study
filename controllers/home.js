module.exports = function(app){
  var Usuario = app.models.usuario;
  var HomeController = {
    index: function(req,res){
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function(erro,usuario){
        res.render('home/index',{carros: usuario.carros});
      })
    },
    cadastro: function(req,res){
      var _id = req.session.usuario._id;
      Usuario.findById(_id,function(erro,usuario){
        var carro = req.body.carro;
        usuario.carros.push(carro);
        usuario.save(function(){
          res.render('home/index',{carros: usuario.carros});
        });
      });
    },
    remover: function(req,res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id,function(erro,usuario){
          var carroID = req.params.id;
          usuario.carros.id(carroID).remove();
          usuario.save(function() {
            res.render('home/index',{carros: usuario.carros});
          });
      });
    },
    detalhar: function(req,res){
      var _id = req.session.usuario._id;
      Usuario.findById(_id,function(erro,usuario){
        var carroID = req.params.id;
        res.render('home/detalhar',{carro: usuario.carros.id(carroID), idx: carroID});
      });
    },
    edita: function(req,res){
      var _id = req.session.usuario._id;
      Usuario.findById(_id,function(erro,usuario){
        var carroID = req.body.index;
        var carro = usuario.carros.id(carroID);
        carro.nome = req.body.carro.nome;
        carro.modelo = req.body.carro.modelo;
        carro.ano = req.body.carro.ano;
        carro.fabricante = req.body.carro.fabricante;
        usuario.save(function(){
          res.render('home/index',{carros:usuario.carros});
        });
      });
    }
  };
  return HomeController;
};
