var mongoose =      require('mongoose');
var bodyParser =    require('body-parser');
let Cliente =       require("../../models/clienteModel");
let Nutricionista = require("../../models/nutricionistaModel");
var jwt =           require('jwt-simple');
let jwtInfo =       require("../../config/jwt.json");


exports.logar = function(data){
    return new Promise(function(resolve, reject){
        console.log("Conferir a senha");

        Cliente.find({email: data.email, senha: data.senha}, function (err, clientes) {
            console.log(clientes);  
            if (err){
                reject({"status":false, "message":"Ocorreu um erro ao requisitar login", "error": err});
            }
            else{
                if (clientes.length == 1){
                    resolve(clientes[0]);
                }
                else{
                    reject({"status":false, "message":"Error, email ou senha inválida", "error": err});
                }
            }      
        });
    });
}

exports.logarNutricionista = function(data){
    return new Promise(function(resolve, reject){
        console.log("Conferir a senha");

        Nutricionista.find({email: data.email, senha: data.password}, function (err, nutricionista) {
            console.log(nutricionista);  
            if (err){
                reject({"status":false, "message":"Ocorreu um erro ao requisitar login nutri", "error": err});
            }
            else{
                if (nutricionista.length == 1){
                    resolve({"token": jwt.encode(nutricionista[0], jwtInfo.secret)});
                }
                else{
                    reject({"status":false, "message":"Error, email ou senha inválida nutri", "error": err});
                }
            }      
        });
    });
}
