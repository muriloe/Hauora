var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
const ObjectId =        mongoose.Types.ObjectId;
let jwt =               require('jsonwebtoken');
let jwtInfo =           require("../../config/jwt.json");
var cardapioBusiness =  require("../../business/cardapio/cardapioBusiness");

module.exports = function(app) {

    app.get('/api/cardapios', function(req, res){
        console.log("/api/cardapios");
        jwt.verify(req.headers['jwt'], jwtInfo.secret, function(err, decoded) {
            if(err){
                res.end(JSON.stringify('token inválido bicho'));
            }else {
                let clienteId = decoded._id;
                console.log("Token Valido, id_cliente:" + decoded._id);
                cardapioBusiness.obterCardapioPorIdUsuario(clienteId).then(function(response){
                    res.end(JSON.stringify(response));
                }).catch(function(err){
                    res.end(JSON.stringify(err));
                });
            }
        });
        
    });

    app.get('/api/cardapios/novo', function(req, res){
        console.log("/api/cardapios/novo");
        jwt.verify(req.headers['jwt'], jwtInfo.secret, function(err, decoded) {
            if(err){
                res.end(JSON.stringify('token inválido bicho'));
            }else {
                let clienteId = decoded._id;
                console.log("Token Valido, id_cliente:" + decoded._id);
                cardapioBusiness.novoCardapio(clienteId).then(function(response){
                    res.end(JSON.stringify(response));
                }).catch(function(err){
                    res.end(JSON.stringify(err));
                });
            }
        });
        
    });

    app.get('/api/cardapios/web/:clienteId', function(req, res){
   
        cardapioBusiness.obterCardapioPorIdUsuarioWeb(req.params.clienteId).then(function(response){
            res.status(200).json({
                message: 'Success',
                obj: response
            });
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });
    });

    app.post('/api/cardapio/atualizar', function(req, res){
        console.log('ASDASDASDASD');
        console.log(req.body.json);
        console.log(JSON.parse(req.body.json));

        
        cardapioBusiness.atualizarCardapio(req.body).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.status(404).end(JSON.stringify(err));
        });  
    });

}