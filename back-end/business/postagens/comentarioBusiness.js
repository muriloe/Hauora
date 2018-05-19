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

    return new Promise(function(resolve,reject){
        Comentario.find({postagem_id: idPostOuConsulta }, 
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
                    Comentario.find({consulta_id: idPostOuConsulta }, 
                        function (err, comentarioConsulta){
                            if (err) throw err;
                            //Se for maior que zero significa que o comentário é de uma consulta
                            if(comentarioConsulta.length > 0){
                                resolve(comentarioConsulta);   
                            }
                            else{
                                reject({});
                            }
                        } );
                }
            } );
    });
}
