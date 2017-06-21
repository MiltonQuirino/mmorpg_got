module.exports.jogo = function(application, req, res){
		if(!req.session.autorizado){
				res.send('Precisa estar logado para acessar a pagina');
				return;
		}
		
		var usuario = req.session.usuario;
		var casa = req.session.casa;

		var connection = application.config.dbConnection;
		var JogoDAO = new application.app.models.JogoDAO(connection);

		JogoDAO.iniciaJogo(res, usuario, casa);
	
}

module.exports.sair = function(application, req, res){
		
		req.session.destroy(function(erro){
			res.render('index', {validacao:{}});
		});  	
}

module.exports.suditos = function(application, req, res){
		
		req.session.destroy(function(erro){
			res.render('aldeoes', {validacao:{}});
		});  	
}

module.exports.pergaminhos = function(application, req, res){
		
		req.session.destroy(function(erro){
			res.render('pergaminhos', {validacao:{}});
		});  	
}