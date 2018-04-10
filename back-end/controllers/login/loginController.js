var mongoose = require('mongoose');
var bodyParser = require('body-parser');
let Cliente = require("../../models/clienteModel");

module.exports = function(app) {
    app.post('/api/cliente/login', function(req, res){
        console.log("Conferir a senha");
        Cliente.find({email: req.body.email, senha: req.body.senha}, function (err, clientes) {
        console.log(clientes);  
        if (err){
            return res.status(500).json({
                title: 'Ocorreu um erro',
                error: err
            })
        }
        else{
            if (clientes.length == 1){
                res.status(200).json({
                    message: 'Success',
                    obj: clientes
                });
            }
            else{
                res.status(200).json({
                    message: 'Error, senha inválida',
                    obj: clientes
                });
            }

        }
        
    });
        
    });

    
}