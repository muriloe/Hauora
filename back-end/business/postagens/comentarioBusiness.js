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