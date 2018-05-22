let Grupo =     require("../../models/grupoModel");
let Alimento =  require("../../models/alimentoModel");

exports.getGrupos = function() {
    return new Promise(function(resolve,reject){
        Grupo.find({}, function(err, grupos){
            if (err){
                reject({"status":false, "message":"Erro ao obter grupos", "error": err});
            }
            else{
                console.log("sucesso ao obter grupo da bussiness");
                resolve({ grupos });       
            }
        });
    });
}

exports.getAlimentos = function(dat) {
    return new Promise(function(resolve,reject){
        Alimento.find({'grupo': dat}, function(err, alimentos){
            if (err){
                reject({"status":false, "message":"Erro ao obter alimentos de um grupo", "error": err});
            }
            else{
                console.log("sucesso ao obter alimentos de determinado grupo da bussiness");
                resolve({ alimentos });       
            }
        });
    });
}

exports.getGruposAlimentos = function(dat) {
    return new Promise(function(resolve,reject){
        Grupo.aggregate([
            { $match : {}},
            { $lookup:
                {
                    from: 'alimentos',
                    localField: '_id',
                    foreignField: 'grupo',
                    as: 'alimentos'
                }
            },

            
        ], function(err, grupo){
            if (err){
                reject({"status":false, "message":"Erro ao obter grupos", "error": err});
            }
            else{
                console.log("sucesso ao obter grupo da bussiness");
                resolve(grupo);       
            }
        });
    });
}
