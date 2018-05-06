var mongoose =          require('mongoose');
var bodyParser =        require('body-parser');
let Cliente =           require("../../models/clienteModel");
var loginBusiness =     require("../../business/login/loginBusiness");

module.exports = function(app) {
    app.post('/api/cliente/login', function(req, res){
        console.log(req.body);
        loginBusiness.logar(req.body).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.status(404).end(JSON.stringify(err));
        });
    });

    app.post('/api/nutricionista/login', function(req, res){
        console.log(req.body);
        loginBusiness.logarNutricionista(req.body).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.status(404).end(JSON.stringify(err));
        });
    });


}