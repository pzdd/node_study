var express = require('express')
, load = require('express-load'),
app = express(),
error = require('./middleware/error'),
server = require('http').createServer(app),
mongoose = require('mongoose');

global.db = mongoose.connect('mongodb://localhost/study-project');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// o session utiliza para codificar e ou decodificar o sessionid
app.use(express.cookieParser('study-project'));
app.use(express.session());
/* responsavel por criar objetos JSON vindos de formularios HTML*/
app.use(express.json());
app.use(express.urlencoded());
/* permite utilizar um mesmo path entre os metodos do HTTP,
 fazendo uma sobrescrita de metodos */
app.use(express.methodOverride());
/* gerencia as rotas da aplicacao */
app.use(app.router);
app.use(express.static(__dirname + '/public'));
/* renderiza views de error */
app.use(error.notFound);
app.use(error.serverError);


/*mapear diretorios para carregar e injetar modulos dentro da variavel definida em indo*/
load('models')
.then('controllers')
.then('routes')
.into(app);

/* routes/user.js excluido
  routes/index.js renomeado para home.js
  views/index.ejs excluido
 */

server.listen(3000, function(){
console.log("study-project no ar.");
});

module.exports = app;
