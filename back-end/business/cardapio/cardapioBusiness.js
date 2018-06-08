let Cliente =       require("../../models/clienteModel");
let Cardapio =      require("../../models/cardapioModel");
let Composicao =    require("../../models/composicaoModel");
let Grupo =         require("../../models/grupoModel");
let Alimento =      require("../../models/alimentoModel");
let serverInfo =    require("../../config/server");
let Notificacao =   require("../../models/notificacaoModel");
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

exports.atualizarCardapio = function(data){
    return new Promise(function(resolve,reject){
        console.log("Atualizando cardapio");
        const dataConsulta = new Date();
        let dadosConsulta = (JSON.parse(data.json));
        let clienteId = dadosConsulta.clienteId;

        let listaComposicaoCafeDaManha = [];
        let listaComposicaoLancheDaManha = [];
        let listaComposicaoAlmoco = [];
        let listaComposicaoLanche = [];
        let listaComposicaoJanta = [];
        var cardapioCafeDaManha = new Cardapio();
        var cardapioLancheDaManha = new Cardapio();
        var cardapioAlmoco = new Cardapio();
        var cardapioLanche = new Cardapio();
        var cardapioJanta = new Cardapio();

        Cardapio.remove({ usuario_id: clienteId }, function(err) {
            if (!err) {
                console.log('Removeu cardapio antigo');
                if(dadosConsulta.composicoesCafeDaManha.length > 0){
                    console.log("Criando café da manhã"); 
                    cardapioCafeDaManha.data = dataConsulta;
                    cardapioCafeDaManha.usuario_id = clienteId;
                    cardapioCafeDaManha.tipo = 'CAFE_DA_MANHA';
        
                    dadosConsulta.composicoesCafeDaManha.forEach(composicao => {
                        let novaComposicao = new Composicao(composicao); 
                        novaComposicao.cardapio = cardapioCafeDaManha._id;
                        listaComposicaoCafeDaManha.push(novaComposicao);
        
                        cardapioCafeDaManha.composicao.push(novaComposicao._id);
                        console.log(novaComposicao); 
        
                    });
                }
        
                if(dadosConsulta.composicoesLancheDaManha.length > 0){
                    console.log("Criando composicoesLancheDaManha:"); 
                    cardapioLancheDaManha.data = dataConsulta;
                    cardapioLancheDaManha.usuario_id = clienteId;
                    cardapioLancheDaManha.tipo = 'LANCHE_DA_MANHA';
        
                    dadosConsulta.composicoesLancheDaManha.forEach(composicao => {
                        let novaComposicao = new Composicao(composicao); 
                        novaComposicao.cardapio = cardapioLancheDaManha._id;
                        listaComposicaoLancheDaManha.push(novaComposicao);
        
                        cardapioLancheDaManha.composicao.push(novaComposicao._id);
                        console.log(novaComposicao); 
                    });
                }
        
                if(dadosConsulta.composicoesAlmoco.length > 0){
                    console.log("Criando composicoesAlmoco:"); 
                    cardapioAlmoco.data = dataConsulta;
                    cardapioAlmoco.usuario_id = clienteId;
                    cardapioAlmoco.tipo = 'ALMOCO';
        
                    dadosConsulta.composicoesAlmoco.forEach(composicao => {
                        let novaComposicao = new Composicao(composicao); 
                        novaComposicao.cardapio = cardapioAlmoco._id;
                        listaComposicaoAlmoco.push(novaComposicao);
        
                        cardapioAlmoco.composicao.push(novaComposicao._id);
                        console.log(novaComposicao); 
                    });
                }
        
                if(dadosConsulta.composicoesLanche.length > 0){
                    console.log("Criando composicoesLanche:"); 
                    cardapioLanche.data = dataConsulta;
                    cardapioLanche.usuario_id = clienteId;
                    cardapioLanche.tipo = 'LANCHE';
        
                    dadosConsulta.composicoesLanche.forEach(composicao => {
                        let novaComposicao = new Composicao(composicao); 
                        novaComposicao.cardapio = cardapioLanche._id;
                        listaComposicaoLanche.push(novaComposicao);
        
                        cardapioLanche.composicao.push(novaComposicao._id);
                        console.log(novaComposicao); 
                    });
                }
        
                if(dadosConsulta.composicoesJanta.length > 0){
                    console.log("Criando composicoesJanta:"); 
                    cardapioJanta.data = dataConsulta;
                    cardapioJanta.usuario_id = clienteId;
                    cardapioJanta.tipo = 'JANTA';
        
                    dadosConsulta.composicoesJanta.forEach(composicao => {
                        let novaComposicao = new Composicao(composicao); 
                        novaComposicao.cardapio = cardapioJanta._id;
                        listaComposicaoJanta.push(novaComposicao);
        
                        cardapioJanta.composicao.push(novaComposicao._id);
                        console.log(novaComposicao); 
                    });
                }
        
                if(dadosConsulta.composicoesCafeDaManha.length > 0){
                    cardapioCafeDaManha.save(function (err, results) {
                        console.log("iniciando salvção da cardapioCafeDaManha");
                        if(err) {
                            console.log("Erro ao salvar cardapioCafeDaManha");  
                            reject({"status":false, "message":"Erro ao salvar cardapioCafeDaManha", "error": err});
                        }
                        else{
                            console.log("cardapioCafeDaManha Salvo");  
                        }
                    });
                }
        
                if(dadosConsulta.composicoesLancheDaManha.length > 0){
                    cardapioLancheDaManha.save(function (err, results) {
                        console.log("iniciando salvção da cardapioLancheDaManha");
                        if(err) {
                            console.log("Erro ao salvar cardapioLancheDaManha");  
                            reject({"status":false, "message":"Erro ao salvar cardapioLancheDaManha", "error": err});
                        }
                        else{
                            console.log("cardapioLancheDaManha Salvo");  
                        }
                    });
                }
        
                if(dadosConsulta.composicoesAlmoco.length > 0){
                    cardapioAlmoco.save(function (err, results) {
                        console.log("iniciando salvção da cardapioAlmoco");
                        if(err) {
                            console.log("Erro ao salvar cardapioAlmoco");  
                            reject({"status":false, "message":"Erro ao salvar cardapioAlmoco", "error": err});
                        }
                        else{
                            console.log("cardapioAlmoco Salvo");  
                        }
                    });
                }
        
                if(dadosConsulta.composicoesLanche.length > 0){
                    cardapioLanche.save(function (err, results) {
                        console.log("iniciando salvção da cardapioLanche");
                        if(err) {
                            console.log("Erro ao salvar cardapioLanche");  
                            reject({"status":false, "message":"Erro ao salvar cardapioLanche", "error": err});
                        }
                        else{
                            console.log("cardapioLanche Salvo");  
                        }
                    });
                }
        
                if(dadosConsulta.composicoesJanta.length > 0){
                    cardapioJanta.save(function (err, results) {
                        console.log("iniciando salvção da cardapioJanta");
                        if(err) {
                            console.log("Erro ao salvar cardapioJanta");  
                            reject({"status":false, "message":"Erro ao salvar cardapioJanta", "error": err});
                        }
                        else{
                            console.log("cardapioJanta Salvo");  
                        }
                    });
                }
        
                for(var i = 0; i< listaComposicaoCafeDaManha.length; i++){
                    console.log("iniciando salvção de listaComposicaoCafeDaManha");
                    composicao = new Composicao(listaComposicaoCafeDaManha[i]);
                    composicao.save(function (err, results) {
                        if(err) {
                            console.log("Erro ao salvar listaComposicaoCafeDaManha "+ i); 
                            reject({"status":false, "message":"Erro ao salvar listaComposicaoCafeDaManha", "error": err});
                        }
                        else{
                            console.log("Salvou listaComposicaoCafeDaManha");
                        }
                    });
                }
        
                if(dadosConsulta.composicoesLancheDaManha.length > 0){
                    for(var i = 0; i< listaComposicaoLancheDaManha.length; i++){
                        console.log("iniciando salvção de listaComposicaoLancheDaManha");
                        composicao = new Composicao(listaComposicaoLancheDaManha[i]);
                        composicao.save(function (err, results) {
                            if(err) {
                                console.log("Erro ao salvar listaComposicaoLancheDaManha "+ i); 
                                reject({"status":false, "message":"Erro ao salvar listaComposicaoLancheDaManha", "error": err});
                            }
                            else{
                                console.log("Salvou listaComposicaoLancheDaManha");
                            }
                        });
                    }
                }
        
                if(dadosConsulta.composicoesAlmoco.length > 0){
                    for(var i = 0; i< listaComposicaoAlmoco.length; i++){
                        console.log("iniciando salvção de listaComposicaoAlmoco");
                        composicao = new Composicao(listaComposicaoAlmoco[i]);
                        composicao.save(function (err, results) {
                            if(err) {
                                console.log("Erro ao salvar listaComposicaoAlmoco "+ i); 
                                reject({"status":false, "message":"Erro ao salvar listaComposicaoAlmoco", "error": err});
                            }
                            else{
                                console.log("Salvou listaComposicaoAlmoco");
                            }
                        });
                    }
                }
        
                if(dadosConsulta.composicoesLanche.length > 0){
                    for(var i = 0; i< listaComposicaoLanche.length; i++){
                        console.log("iniciando salvção de listaComposicaoLanche");
                        composicao = new Composicao(listaComposicaoLanche[i]);
                        composicao.save(function (err, results) {
                            if(err) {
                                console.log("Erro ao salvar listaComposicaoLanche "+ i); 
                                reject({"status":false, "message":"Erro ao salvar listaComposicaoLanche", "error": err});
                            }
                            else{
                                console.log("Salvou listaComposicaoLanche");
                            }
                        });
                    }
                }
        
                if(dadosConsulta.composicoesJanta.length > 0){
                    for(var i = 0; i< listaComposicaoJanta.length; i++){
                        console.log("iniciando salvção de listaComposicaoJanta");
                        composicao = new Composicao(listaComposicaoJanta[i]);
                        composicao.save(function (err, results) {
                            if(err) {
                                console.log("Erro ao salvar listaComposicaoJanta "+ i); 
                                reject({"status":false, "message":"Erro ao salvar listaComposicaoJanta", "error": err});
                            }
                            else{
                                console.log("Salvou listaComposicaoJanta");
                                resolve({ "status":true }); 
                                    
                            }
                        });
                    }
                }
            }
            else {
                reject({"status":false, "message":"Erro ao salvar consulta", "error": err});

            }
        });

    });

}