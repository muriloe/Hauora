var mongoose =          require('mongoose');
var bodyParser =        require('body-parser');
let Cliente =           require("../../models/clienteModel");
var loginBusiness =     require("../../business/login/loginBusiness");

module.exports = function(app) {
    app.post('/api/cliente/login', function(req, res){
        loginBusiness.logar(req.body).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.status(404).end(JSON.stringify(err));
        });
    });
}