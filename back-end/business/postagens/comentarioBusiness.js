let Cliente =       require("../../models/clienteModel");
let Postagem =      require("../../models/postagemModel");
let Nutricionista = require("../../models/nutricionistaModel");
let Consulta =      require("../../models/consultaModel");
let Comentario =    require("../../models/comentarioModel");
let serverInfo =    require("../../config/server");
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
            nutricionista_id: comentario.nutricionista_id,
        });

        
        if(comentario.postagem.id){
            nComentario.postagem_id = comentario.postagem.id;
        }
        if(comentario.consulta.id){
            nComentario.consulta_id = comentario.consulta.id;
        }

        nComentario.save(function (err, results) {
            console.log("iniciando salvação de comentario");
            if(err) {
                console.log("Erro ao salvar comentario"); 
                reject({"status":false, "message":"Erro ao salvar comentario", "error": err});
            }
            else{
                console.log("Salvou comentario");
                resolve({ "comentario":results });   
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
            {
                $project: {
                    _id: 1,
                    data: 1,
                    postagem_id: 1,
                    texto: 1,
                    usuario_id: 1,
                    __v: 1,
                    cliente: {$arrayElemAt:["$cliente",0]},
                }
            }
            
        ],
            function (err, comentarioPost){
                if (err){
                    throw err;
                    reject({"status":false, "message":"Erro ao obter comentario", "error": err});
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
                    ], 
                        function (err, comentarioConsulta){
                            if (err) throw err;
                            //Se for maior que zero significa que o comentário é de uma consulta
                            if(comentarioConsulta.length > 0){
                                resolve(comentarioConsulta);   
                            }
                            else{
                                reject({"status":false, "message":"Erro ao obter comentario(2)", "error": err});
                            }
                        } );
                }
            } );
    });
}
