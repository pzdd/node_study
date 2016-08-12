module.exports = function(app){
  var Schema = require('mongoose').Schema;
  var carro = Schema({
      nome: String,
      modelo: String,
      ano: String,
      fabricante: String
  });
  var usuario = Schema({
    login: {type: String, required: true, index:{unique:true}},
    senha: {type: String, required:true},
    carros: [carro]
  });
  return db.model('usuarios',usuario);
};
