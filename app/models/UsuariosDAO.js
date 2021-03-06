var crypto = require("crypto");

function UsuariosDAO(connection){
  this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){

  this._connection.open(function(erro, mongoClient){
    mongoClient.collection('usuarios',function(erro, collection){

      usuario.senha = criptografa(usuario.senha);
      collection.insert(usuario);
      mongoClient.close();
    });
  });
  
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){

  this._connection.open(function(erro, mongoClient){
    mongoClient.collection('usuarios',function(erro, collection){

      usuario.senha = criptografa(usuario.senha);

      var user = collection.find(usuario).toArray(function(erro, result){
        if(result[0] != undefined){

          req.session.autorizado = true;
          req.session.usuario = result[0].usuario;
          req.session.nome = result[0].nome;
          req.session.casa = result[0].casa;

        }else{

          var errors = [{  msg: 'usuário ou senha inválidos' }];
          res.render('index', { validacao: errors });
          return;
        }

        if(req.session.autorizado){
          res.redirect('jogo');
        }else{
          res.render('index', {validacao:{}});
        }

      });
      mongoClient.close();
    });
  });
  
} 

function criptografa(valor){
  var criptografado = crypto.createHash("md5").update(valor).digest("hex");
  return criptografado;
}

	// if(erros){
	// 		res.render("index", {validacao: erros});
	// 		return;
	// 	}

module.exports = function(){
  return UsuariosDAO;
}