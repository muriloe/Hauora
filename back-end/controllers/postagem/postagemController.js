var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
const ObjectId =        mongoose.Types.ObjectId;
let jwt =               require('jsonwebtoken');
let jwtInfo =           require("../../config/jwt.json");
var postagemBusiness =  require("../../business/postagens/postagemBusiness");

module.exports = function(app) {

    app.post('/api/postagens/save', function(req, res){
        console.log("/api/postagens/save");
        console.log(req.headers['jwt']);
        console.log(req.body);
        jwt.verify(req.headers['jwt'], jwtInfo.secret, function(err, decoded) {
            if(err){
                res.end(JSON.stringify('token inválido bicho'));
            }else {
                let clienteId = decoded.postagem.cliente._id;
                console.log("Token Valido, id_cliente:" + decoded.postagem.cliente._id);
                postagemBusiness.criarPostagem(clienteId, req.body).then(function(response){
                    res.end(JSON.stringify(response));
                }).catch(function(err){
                    res.end(JSON.stringify(err));
                });
            }
        });
        
    });
}