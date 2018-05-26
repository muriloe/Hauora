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

}