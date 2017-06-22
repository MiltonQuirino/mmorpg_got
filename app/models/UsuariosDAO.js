function UsuariosDAO(connection){
  this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){

  this._connection.open(function(erro, mongoClient){
    mongoClient.collection('usuarios',function(erro, collection){
      collection.insert(usuario);
      mongoClient.close();
    });
  });
  
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){


  this._connection.open(function(erro, mongoClient){
    mongoClient.collection('usuarios',function(erro, collection){
      var user = collection.find(usuario).toArray(function(erro, result){
        if(result[0] != undefined){
          req.session.autorizado = true;
          req.session.usuario = result[0].usuario;
          req.session.nome = result[0].nome;
          req.session.casa = result[0].casa;
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

module.exports = function(){
  return UsuariosDAO;
}