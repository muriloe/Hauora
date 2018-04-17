var mongoose =      require('mongoose');
var bodyParser =    require('body-parser');
let Cliente =       require("../../models/clienteModel");

exports.logar = function(data){
    return new Promise(function(resolve,reject){
        console.log("Conferir a senha");
        Cliente.find({email: data.email, senha: data.senha}, function (err, clientes) {
            console.log(clientes);  
            if (err){
                reject({"status":false, "message":"Ocorreu um erro ao requisitar login", "error": err});
            }
            else{
                if (clientes.length == 1){
                    resolve({"anamnese": clientes[0] });
                }
                else{
                    reject({"status":false, "message":"Error, email ou senha inválida", "error": err});
                }
            }      
        });
    });
}
