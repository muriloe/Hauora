let Cliente =       require("../../models/clienteModel");
let Postagem =      require("../../models/postagemModel");
let Nutricionista = require("../../models/nutricionistaModel");
let Consulta =      require("../../models/consultaModel");
let Comentario =    require("../../models/comentarioModel");
let serverInfo =    require("../../config/server");
let Notificacao =   require("../../models/notificacaoModel");
var mongoose =      require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.criarComentario = function(clienteId, comentario) {

    return new Promise(function(resolve,reject){
        var nComentario = new Comentario({
            postagem_id: comentario.postagem_id,
            texto: comentario.texto,
            link_arquivo: comentario.link_arquivo,
            usuario_id: clienteId,
            consulta_id: comentario.consulta_id,
            data: Date.now(),
            nutricionista_id: comentario.nutricionista_id,
        });

        
        if(comentario.hasOwnProperty('postagem')){
            console.log('tem atributo postagem.id');
            nComentario.postagem_id = comentario.postagem._id;
        }
        if(comentario.hasOwnProperty('consulta')){
            console.log('tem atributo consulta.id');
            nComentario.consulta_id = comentario.consulta._id;
        }

        console.log('a3');

        nComentario.save(function (err, results) {
            console.log("iniciando salvação de comentario");
            if(err) {
                console.log("Erro ao salvar comentario"); 
                reject({"status":false, "message":"Erro ao salvar comentario", "error": err});
            }
            else{
                console.log(clienteId);
                Cliente.findById({_id: clienteId}, 
                    function (err, cliente){
                        if (err){
                            throw err;
                            reject({"status":false, "message":"Erro ao ovter ", "error": err});
                        }
                        else{
                            console.log(comentario);
                            console.log('-----------------');
                            console.log(cliente);
                            if(comentario.postagem._id){
                                console.log('111');
                                var mensagem = 'Usuário '+cliente.nome+ ' do email ' +cliente.email+ ' realizou um comentário em uma postagem';
                                var notificacao = new Notificacao({
                                    texto: mensagem,
                                    cliente: clienteId,
                                    postagem: comentario.postagem_id
                                });
                                console.log('222');
                                                            
                                notificacao.save(function (err, results) {
                                    console.log("iniciando salvção de notificacao");
                                    if(err) {
                                        console.log("Erro ao salvar notificacao");  
                                        reject({"status":false, "message":"Erro ao salvar notificacao", "error": err});
                                    }
                                    else{
                                        console.log(notificacao);
                                        console.log("Salvou comentario");
                                        console.log(results);
                                        resolve({ "comentario":results });   
                                    }
                                });
                            }
                            if(comentario.consulta._id){
                                console.log('333');
                                var mensagem = 'Usuário '+cliente.nome+ ' do email ' +cliente.email+ ' realizou um comentário em uma consulta';
                                var notificacao = new Notificacao({
                                    texto: mensagem,
                                    cliente: clienteId,
                                    consulta: comentario.consulta_id,
                                });
                                console.log('444');
                                                            
                                notificacao.save(function (err, results) {
                                    console.log("iniciando salvção de notificacao");
                                    if(err) {
                                        console.log("Erro ao salvar notificacao");  
                                        reject({"status":false, "message":"Erro ao salvar notificacao", "error": err});
                                    }
                                    else{
                                        console.log(notificacao);
                                        console.log("Salvou comentario");
                                        console.log(results);
                                        resolve({ "comentario":results });   
                                    }
                                });
                            }
                        }
                });
                

            }
        });

    });
}

exports.obterComentariosDePostagem = function(idPostOuConsulta) {
    console.log(idPostOuConsulta);

    return new Promise(function(resolve,reject){
        
        Comentario.aggregate([
            { $match : {postagem_id: ObjectId(idPostOuConsulta)}},
            { $lookup:
                {
                    from: 'pessoas',
                    localField: 'usuario_id',
                    foreignField: '_id',
                    as: 'cliente'
                }
            },
            { $lookup:
                {
                    from: 'pessoas',
                    localField: 'nutricionista_id',
                    foreignField: '_id',
                    as: 'nutricionista'
                }
            },
            {
                $project: {
                    _id: 1,
                    data: 1,
                    postagem_id: 1,
                    texto: 1,
                    usuario_id: 1,
                    __v: 1,
                    escritor:  {$ifNull: [{$arrayElemAt:["$cliente",0]}, {$arrayElemAt:["$nutricionista",0]} ] },
                }
            }
            
        ],
            function (err, comentarioPost){
                if (err){
                    throw err;
                    reject(comentarioPost);
                } 
                //Se for maior que zero significa que o comentário é de uma postagem
                if(comentarioPost.length > 0){
                    resolve(comentarioPost);   
                }
                else{
                    Comentario.aggregate([
                        { $match : {consulta_id: ObjectId(idPostOuConsulta)}},
                        { $lookup:
                            {
                                from: 'pessoas',
                                localField: 'usuario_id',
                                foreignField: '_id',
                                as: 'cliente'
                            }
                        },
                        { $lookup:
                            {
                                from: 'pessoas',
                                localField: 'nutricionista_id',
                                foreignField: '_id',
                                as: 'nutricionista'
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                data: 1,
                                postagem_id: 1,
                                texto: 1,
                                usuario_id: 1,
                                __v: 1,
                                escritor:  {$ifNull: [{$arrayElemAt:["$cliente",0]}, {$arrayElemAt:["$nutricionista",0]} ] },
                            }
                        }
                    ], 
                        function (err, comentarioConsulta){
                            if (err) throw err;
                            //Se for maior que zero significa que o comentário é de uma consulta
                            if(comentarioConsulta.length > 0){
                                resolve(comentarioConsulta);   
                            }
                            else{
                                reject(comentarioConsulta);
                            }
                        } );
                }
            } );
    });
}

exports.obterComentariosDePostagemWeb = function(idPostOuConsulta) {
    console.log(idPostOuConsulta);

    return new Promise(function(resolve,reject){
        
        Comentario.aggregate([
            { $match : {postagem_id: ObjectId(idPostOuConsulta)}},
            { $lookup:
                {
                    from: 'pessoas',
                    localField: 'usuario_id',
                    foreignField: '_id',
                    as: 'cliente'
                }
            },
            { $lookup:
                {
                    from: 'pessoas',
                    localField: 'nutricionista_id',
                    foreignField: '_id',
                    as: 'nutricionista'
                }
            },
            {
                $project: {
                    _id: 1,
                    data: 1,
                    postagem_id: 1,
                    texto: 1,
                    usuario_id: 1,
                    __v: 1,
                    cliente: {$arrayElemAt:["$cliente",0]},
                    nutricionista: {$arrayElemAt:["$nutricionista",0]},
                }
            }
            
        ],
            function (err, comentarioPost){
                if (err){
                    throw err;
                    reject(comentarioPost);
                } 
                //Se for maior que zero significa que o comentário é de uma postagem
                if(comentarioPost.length > 0){
                    resolve(comentarioPost);   
                }
                else{
                    Comentario.aggregate([
                        { $match : {consulta_id: ObjectId(idPostOuConsulta)}},
                        { $lookup:
                            {
                                from: 'pessoas',
                                localField: 'usuario_id',
                                foreignField: '_id',
                                as: 'cliente'
                            }
                        },
                        { $lookup:
                            {
                                from: 'pessoas',
                                localField: 'nutricionista_id',
                                foreignField: '_id',
                                as: 'nutricionista'
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                data: 1,
                                postagem_id: 1,
                                texto: 1,
                                usuario_id: 1,
                                __v: 1,
                                cliente: {$arrayElemAt:["$cliente",0]},
                                nutricionista: {$arrayElemAt:["$nutricionista",0]},
                            }
                        }
                    ], 
                        function (err, comentarioConsulta){
                            if (err) throw err;
                            //Se for maior que zero significa que o comentário é de uma consulta
                            if(comentarioConsulta.length > 0){
                                resolve(comentarioConsulta);   
                            }
                            else{
                                reject(comentarioConsulta);
                            }
                        } );
                }
            } );
    });
}

exports.criarComentarioWeb = function(comentario) {
    let coment = (JSON.parse(comentario.json));
    return new Promise(function(resolve,reject){
        var nComentario = new Comentario({
            postagem_id: coment.postagem_id,
            texto: coment.texto,
            consulta_id: coment.consulta_id,
            data: Date.now(),
            nutricionista_id: coment.nutricionista_id,
        });

        
        if(coment.hasOwnProperty('postagem')){
            console.log('tem atributo postagem.id');
            nComentario.postagem_id = coment.postagem._id;
        }
        if(coment.hasOwnProperty('consulta')){
            console.log('tem atributo consulta.id');
            nComentario.consulta_id = coment.consulta._id;
        }

        console.log('a3');

        nComentario.save(function (err, results) {
            console.log("iniciando salvação de comentario WEB");
            if(err) {
                console.log("Erro ao salvar comentario WEB"); 
                reject({"status":false, "message":"Erro ao salvar comentario WEB", "error": err});
            }
            else{
                console.log("Salvou comentario WEB");
                console.log(results);
                resolve({ "comentario":results });   
            }
        });

    });
}
