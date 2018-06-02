let Cliente =       require("../../models/clienteModel");
let Cardapio =      require("../../models/cardapioModel");
let Composicao =    require("../../models/composicaoModel");
let Grupo =         require("../../models/grupoModel");
let Alimento =      require("../../models/alimentoModel");
let serverInfo =    require("../../config/server");
let Notificacao =      require("../../models/notificaoModel");
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


exports.novoCardapio = function(clienteId){

    return new Promise(function(resolve,reject){
        Cliente.findById({_id: clienteId }, 
            function (err, cliente){
                if (err){
                    throw err;
                    reject({"status":false, "message":"Erro ao ovter cardapio", "error": err});
                }
                else{
                    var mensagem = 'Usuário '+cliente.nome+ ' do email ' +cliente.email+ ' solicitou um novo cardápio';
                    var notificacao = new Notificacao({
                        texto: mensagem,
                        cliente: cliente._id
                    });
                    notificacao.save(function (err, results) {
                        console.log("iniciando salvção de notificacao");
                        if(err) {
                            console.log("Erro ao salvar notificacao");  
                            reject({"status":false, "message":"Erro ao salvar notificacao", "error": err});
                        }
                        else{
                            resolve(notificacao);  
                        }
                    });
                    
                }
            });
    });
}

exports.obterCardapioPorIdUsuarioWeb = function(clienteId){

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