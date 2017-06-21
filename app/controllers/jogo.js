module.exports.jogo = function(application, req, res){
		if(req.session.autorizado){
			res.render('jogo', {img_casa: req.session.casa});
		}else{
			res.send('Precisa estar logado para acessar a pagina'); 
		}
}

module.exports.sair = function(application, req, res){
		
		req.session.destroy(function(erro){
			res.render('index', {validacao:{}});
		});  	
}