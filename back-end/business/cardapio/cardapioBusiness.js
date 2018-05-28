let Cliente =       require("../../models/clienteModel");
let Cardapio =      require("../../models/cardapioModel");
let Composicao =    require("../../models/composicaoModel");
let Grupo =         require("../../models/grupoModel");
let Alimento =      require("../../models/alimentoModel");
let serverInfo =    require("../../config/server");
var mongoose =      require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.obterCardapioPorIdUsuario = function(clienteId){

    return new Promise(function(resolve,reject){
        Cardapio.aggregate([
            { $match : {usuario_id: ObjectId(clienteId)}
            },
            {
                $lookup:
                  {
                    from: "composicoes",
                    localField: "composicao",
                    foreignField: "_id",
                    as: "composicoes"
                  }
            },
            { $unwind: "$composicoes" },
            {
                $lookup:
                  {
                    from: "grupos",
                    localField: "composicoes.grupo",
                    foreignField: "_id",
                    as: "composicoes.grupo"
                  }
            },
            {
                $project : {
                    _id: 1,
                    data: 1,
                    tipo: 1,
                    composicoes: {
                        quantidade: 1,
                        grupo: {$arrayElemAt:["$composicoes.grupo",0]}
                    }
                }
            },
            {
                $group : {
                   _id :  "$_id" ,
                   data : {$first: "$data"},
                   tipo : {$first: "$tipo"},
                   composicoes : {$push: "$composicoes"},
                }
            },
           
        ],function (err, cardapio){
            if (err){
                throw err;
                reject({"status":false, "message":"Erro ao ovter cardapio", "error": err});
            } 

            resolve(cardapio);   
        } );
    });
}