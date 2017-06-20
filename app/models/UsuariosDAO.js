function UsuariosDAO(connection){
  this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
  console.log(usuario);
  this._connection.open(function(erro, mongoClient){
    mongoClient.collection('usuarios',function(erro, collection){
      collection.insert(usuario);
      mongoClient.close();
    });
  });
  
}

module.exports = function(){
  return UsuariosDAO;
}