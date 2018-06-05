var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
const ObjectId =        mongoose.Types.ObjectId;
let jwt =               require('jsonwebtoken');
let jwtInfo =           require("../../config/jwt.json");
var postagemBusiness =  require("../../business/postagens/postagemBusiness");

module.exports = function(app) {

    app.post('/api/postagens/save', function(req, res){
        console.log("/api/postagens/save");
        jwt.verify(req.headers['jwt'], jwtInfo.secret, function(err, decoded) {
            if(err){
                res.end(JSON.stringify('token inválido bicho'));
            }else {
                let clienteId = decoded._id;
                console.log("Token Valido, id_cliente:" + decoded._id);
                postagemBusiness.criarPostagem(clienteId, req.body).then(function(response){
                    res.end(JSON.stringify(response));
                }).catch(function(err){
                    res.end(JSON.stringify(err));
                });
            }
        });
        
    });

    app.get('/api/postagens', function(req, res){
        console.log("/api/postagens");
        jwt.verify(req.headers['jwt'], jwtInfo.secret, function(err, decoded) {
            if(err){
                res.end(JSON.stringify('token inválido bicho'));
            }else {
                let clienteId = decoded._id;
                console.log("Token Valido, id_cliente:" + decoded._id);
                postagemBusiness.obterPostagensUsuario(clienteId).then(function(response){
                    res.end(JSON.stringify(response));
                }).catch(function(err){
                    res.end(JSON.stringify(err));
                });
            }
        });    
    });

    //Utilizado para obter todas as postagens pelo frontend
    app.get('/api/postagens/todas', function(req, res){
        console.log("/api/postagens/todas");
            postagemBusiness.obterTodasPostagens().then(function(response){
                res.status(200).json({
                    message: 'Success',
                    obj: response
                });
            }).catch(function(err){
                res.end(JSON.stringify(err));
            });
    });

    app.post('/api/statusPostagem', function(req, res){
        console.log('statusPostagem');
        console.log(req.body.json);
        console.log(JSON.parse(req.body.json));

        
        postagemBusiness.alterarStatusPostagem(req.body).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.status(404).end(JSON.stringify(err));
        });  
    });


    //Utilizado para obter todas as postagens pelo frontend
    app.get('/api/postagens/:idPostagem', function(req, res){
        console.log("/api/postagem/:idPostagem");
            postagemBusiness.obterPostagens(req.params.idPostagem).then(function(response){
                res.status(200).json({
                    message: 'Success',
                    obj: response
                });
            }).catch(function(err){
                res.end(JSON.stringify(err));
            });
    });

        //Utilizado para obter todas as postagens de um usuario pelo frontend
        app.get('/api/postagens/usuario/:idUsuario', function(req, res){
            console.log("/api/postagens/usuario//:idUsuario");
                postagemBusiness.obterPostagensUsuarioWeb(req.params.idUsuario).then(function(response){
                    res.status(200).json({
                        message: 'Success',
                        obj: response
                    });
                }).catch(function(err){
                    res.end(JSON.stringify(err));
                });
        });

}