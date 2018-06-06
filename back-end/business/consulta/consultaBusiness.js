var mongoose =          require('mongoose');
var bodyParser =        require('body-parser');
let Cliente =           require("../../models/clienteModel");
let Consulta =          require("../../models/consultaModel");
let Cardapio =          require("../../models/cardapioModel");
let Composicao =        require("../../models/composicaoModel");
var nodemailer =        require('nodemailer');
const ObjectId = mongoose.Types.ObjectId;


exports.salvarConsulta = function(data){
    return new Promise(function(resolve, reject){
        console.log("Salvando consulta");
        const dataConsulta = new Date();
        let dadosConsulta = (JSON.parse(data.json));
        let consulta = new Consulta(dadosConsulta.consulta);
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
        

        consulta.data = dataConsulta;

        Cardapio.remove({ usuario_id: consulta.cliente }, function(err) {
            if (!err) {
                if(dadosConsulta.composicoesCafeDaManha.length > 0){
                    console.log("Criando café da manhã"); 
                    cardapioCafeDaManha.data = dataConsulta;
                    cardapioCafeDaManha.usuario_id = dadosConsulta.consulta.cliente;
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
                    cardapioLancheDaManha.usuario_id = dadosConsulta.consulta.cliente;
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
                    cardapioAlmoco.usuario_id = dadosConsulta.consulta.cliente;
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
                    cardapioLanche.usuario_id = dadosConsulta.consulta.cliente;
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
                    cardapioJanta.usuario_id = dadosConsulta.consulta.cliente;
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
                                    
                            }
                        });
                    }
                }
        
                consulta.save(function (err, results) {
                    console.log("iniciando salvção da consulta");
                    if(err) {
                        console.log("Erro ao salvar consulta");  
                        reject({"status":false, "message":"Erro ao salvar consulta", "error": err});
                    }
                    else{
                        console.log("-------------consulta Salvo");  
                        enviarEmail(dadosConsulta.consulta.cliente);
                        resolve({ "status":true,"consumo":consulta }); 
                    }
                });
            }
            else {
                reject({"status":false, "message":"Erro ao salvar consulta", "error": err});

            }
        });



        

    });
}

//
function enviarEmail(clienteId) {
    console.log("------------------enviando email ");
    let senha = '123456';
    const novaSenha = {
        senha: senha,
        acesso: true,
    };
    Cliente.update({_id: clienteId}, novaSenha, function(err, raw) {
        if (err) {
          console.log("erro ao mudar senha: " + err);
        }
        console.log("informações de usuário atualizadas: " + raw);
    });

    Cliente.findById({_id: clienteId }, 
        function (err, pessoa){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'hauoranutri@gmail.com',
                  pass: 'S0uMongo'
                }
              });
              
              var mailOptions = {
                from: 'hauoraNutri@gmail.com',
                to: pessoa.email,
                subject: 'Sua conta está ativa!!!',
                html: '<font color="black">Obrigado por fazer uma consulta com o <font color="#3b5998"><b><i>Hauora</i><b></font>, '+
                       'sua senha de acesso no aplicativo é: <b>'+senha + '<b><br><br>Vamos juntos atingir seu objetivo!</font>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
    } );

    
}

exports.obterConsultas = function(clienteId){
    var totalComentarios;
    
    return new Promise(function(resolve, reject){
        Consulta.aggregate([
            { $match : {cliente: ObjectId(clienteId)}},
            { $lookup:
                {
                    from: 'pessoas',
                    localField: 'nutricionista',
                    foreignField: '_id',
                    as: 'nutricionista'
                }
            },
            { $lookup:
                {
                    from: 'comentarios',
                    localField: '_id',
                    foreignField: 'consulta_id',
                    as: 'comentarios'
                }
            },
            {
                $project: {
                    _id: 1,
                    data: 1,
                    linkExames: 1,
                    linkRelatorio: 1,
                    peso: 1,
                    pesoIdeal: 1,
                    altura: 1,
                    percentualGordura: 1,
                    imc: 1,
                    deficiencias: 1,
                    excessos: 1,
                    observacoes: 1,
                    nutricionista: {$arrayElemAt:["$nutricionista",0]},
                    cliente: 1,
                    totalComentarios : {$size:"$comentarios"},
                }
            }
        ], 
            function (err, consulta){
                if (err){
                    throw err;
                    reject({"status":false, "message":"Erro ao obter consultas", "error": err});
                } 
                else{
                    resolve(consulta);
                }
            } );
    });
}

exports.obterConsultasWeb = function(clienteId){
    var totalComentarios;
    
    return new Promise(function(resolve, reject){
        Consulta.aggregate([
            { $match : {cliente: ObjectId(clienteId)}},
            { $lookup:
                {
                    from: 'pessoas',
                    localField: 'nutricionista',
                    foreignField: '_id',
                    as: 'nutricionista'
                }
            },
            { $lookup:
                {
                    from: 'comentarios',
                    localField: '_id',
                    foreignField: 'consulta_id',
                    as: 'comentarios'
                }
            },
            {
                $project: {
                    _id: 1,
                    data: 1,
                    linkExames: 1,
                    linkRelatorio: 1,
                    peso: 1,
                    pesoIdeal: 1,
                    altura: 1,
                    percentualGordura: 1,
                    imc: 1,
                    deficiencias: 1,
                    excessos: 1,
                    observacoes: 1,
                    nutricionista: {$arrayElemAt:["$nutricionista",0]},
                    cliente: 1,
                    totalComentarios : {$size:"$comentarios"},
                }
            },
            {$sort: {data: -1} }
        ], 
            function (err, consulta){
                if (err){
                    throw err;
                    reject({"status":false, "message":"Erro ao obter consultas", "error": err});
                } 
                else{
                    resolve(consulta);
                }
            } );
    });
}

exports.obterTodasConsultas = function(indice){
    var totalComentarios;
    
    return new Promise(function(resolve, reject){
        Consulta.aggregate([
            { $lookup:
                {
                    from: 'comentarios',
                    localField: '_id',
                    foreignField: 'consulta_id',
                    as: 'comentarios'
                }
            },
            {
                $project: {
                    _id: 1,
                    data: 1,
                    linkExames: 1,
                    linkRelatorio: 1,
                    peso: 1,
                    pesoIdeal: 1,
                    altura: 1,
                    percentualGordura: 1,
                    imc: 1,
                    deficiencias: 1,
                    excessos: 1,
                    observacoes: 1,
                    cliente: 1,
                    totalComentarios : {$size:"$comentarios"},
                }
            },
            {$sort: {data: -1} }
        ], 
            function (err, consulta){
                if (err){
                    throw err;
                    reject({"status":false, "message":"Erro ao obter consultas", "error": err});
                } 
                else{
                    resolve(consulta);
                }
            } );
    });
}