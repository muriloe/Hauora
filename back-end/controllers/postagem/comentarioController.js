var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
const ObjectId =        mongoose.Types.ObjectId;
let jwt =               require('jsonwebtoken');
let jwtInfo =           require("../../config/jwt.json");
let comentarioBusiness =  require("../../business/postagens/comentarioBusiness");

module.exports = function(app) {

    app.post('/api/comentarios/save', function(req, res){
        console.log("/api/comentarios/save");
        jwt.verify(req.headers['jwt'], jwtInfo.secret, function(err, decoded) {
            if(err){
                res.end(JSON.stringify('token inválido bicho'));
            }else {
                let clienteId = decoded._id;
                console.log("Token Valido, id_cliente:" + decoded._id);
                comentarioBusiness.criarComentario(clienteId, req.body).then(function(response){
                    res.end(JSON.stringify(response));
                }).catch(function(err){
                    res.end(JSON.stringify(err));
                });
            }
        });
    });


}