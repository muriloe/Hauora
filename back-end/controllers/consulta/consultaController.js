var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
var Cliente =           require('../../models/clienteModel');
var consultaBusiness =  require('../../business/consulta/consultaBusiness');
const ObjectId =        mongoose.Types.ObjectId;
let jwt =               require('jsonwebtoken');
let jwtInfo =           require("../../config/jwt.json");

module.exports = function(app) {

    app.post('/api/consulta', function(req, res){
        console.log('ASDASDASDASD');
        console.log(req.body.json);
        console.log(JSON.parse(req.body.json));

        
        consultaBusiness.salvarConsulta(req.body).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.status(404).end(JSON.stringify(err));
        });  
    });

    app.get('/api/consultas', function(req, res){
        console.log("/api/consultas");
        jwt.verify(req.headers['jwt'], jwtInfo.secret, function(err, decoded) {
            if(err){
                res.end(JSON.stringify('token inválido bicho'));
            }else {
                let clienteId = decoded._id;
                console.log("Token Valido, id_cliente:" + decoded._id);
                consultaBusiness.obterConsultas(clienteId).then(function(response){
                    res.end(JSON.stringify(response));
                }).catch(function(err){
                    res.end(JSON.stringify(err));
                });
            }
        });
        
    });

}