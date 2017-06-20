//importar modulo mongo
var mongo = require('mongodb');

var connMongoDB = function(){
  console.log('entrou na conexao');
  var db = new mongo.Db(
    'got',
    new mongo.Server('localhost', 27017,{}),
    {}
  );

  return db;
}

module.exports = function(){
  return connMongoDB;
}