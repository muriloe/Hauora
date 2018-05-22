let Cliente =       require("../../models/clienteModel");
let Postagem =      require("../../models/postagemModel");
let Consumo =       require("../../models/consumoModel");   
let Exercicio =     require("../../models/exercicioModel");
let Duvida =        require("../../models/duvidaModel");
let Comentario =    require("../../models/comentarioModel");
let serverInfo =    require("../../config/server");
var mongoose =      require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.criarPostagem = function(clienteId, postagem){
    return new Promise(function(resolve,reject){
        console.log("Criando postagem");
        let nPostagem = new Postagem();
        nPostagem.usuario_id = clienteId;

        if(postagem.linkFoto){
            console.log("tem fto na postagem");
            var base64Foto = postagem.linkFoto.replace(/^data:image\/jpeg;base64,/, "");
            console.log("upando foto");
            //Prepara o endereço onde vai salvar a foto
            var urlPhoto = './uploads/'+nPostagem._id+'.jpeg';
            //Adiciona o endereço do servidor
            var urlServer = serverInfo.serverUrl + '/uploads/'+nPostagem._id+'.jpeg';
            //Grava a foto
            require("fs").writeFile(urlPhoto, base64Foto, 'base64', function(err) {
                if (err){
                    reject({"status":false, "message":"Erro ao salvar a foto de postagem", "error": err});
                }
            });
            nPostagem.linkFoto = urlServer;
        }
        console.log('aaaa------------------------');
        console.log(postagem);

        if(postagem.duvida){
            let duvida = new Duvida({
                texto: postagem.duvida.texto,
            });
            nPostagem.duvida_id = duvida._id;
            duvida.save(function (err, results) {
                console.log("iniciando salvção de duvida da postagem");
                if(err) {
                    console.log("Erro ao salvar duvida da postagem"); 
                    reject({"status":false, "message":"Erro ao salvar duvida da postagem", "error": err});
                }
                else{
                    console.log("Salvou duvida da postagem");
                }
            });
        }

        if(postagem.exercicio){
            let exercicio = new Exercicio({
                texto: postagem.exercicio.texto,
            });
            nPostagem.exercicio_id = exercicio._id;
            exercicio.save(function (err, results) {
                console.log("iniciando salvção de exercicio da postagem");
                if(err) {
                    console.log("Erro ao salvar exercicio da postagem"); 
                    reject({"status":false, "message":"Erro ao salvar exercicio da postagem", "error": err});
                }
                else{
                    console.log("Salvou exercicio da postagem");
                }
            });
        }

        if(postagem.consumo){
            let consumo = new Consumo({
                texto: postagem.consumo.texto,
            });
            nPostagem.consumo_id = consumo._id;
            consumo.save(function (err, results) {
                console.log("iniciando salvção de consumo da postagem");
                if(err) {
                    console.log("Erro ao salvar consumo da postagem"); 
                    reject({"status":false, "message":"Erro ao salvar consumo da postagem", "error": err});
                }
                else{
                    console.log("Salvou consumo da postagem");
                }
            });
        }

        nPostagem.save(function (err, results) {
            console.log("iniciando salvção da postagem");
            if(err) {
                console.log("Erro ao salvar postagem"); 
                reject({"status":false, "message":"Erro ao salvar postagem", "error": err});
            }
            else{
                console.log("Salvou postagem");
                resolve(results);   
            }
        });
    });
}

exports.obterPostagensUsuario = function(clienteId){
    
    return new Promise(function(resolve,reject){
        var listaPostagem;
        
        Postagem.aggregate([
            { $match : {usuario_id: ObjectId(clienteId)}
            },
            { $lookup:
            {
                from: 'exercicios',
                localField: 'exercicio_id',
                foreignField: '_id',
                as: 'exercicio'
            }
            },
            { $lookup:
                {
                    from: 'duvidas',
                    localField: 'duvida_id',
                    foreignField: '_id',
                    as: 'duvida'
                }
            },
            { $lookup:
                {
                    from: 'consumos',
                    localField: 'consumo_id',
                    foreignField: '_id',
                    as: 'consumo'
                }
            },
            { $lookup:
                {
                    from: 'comentarios',
                    localField: '_id',
                    foreignField: 'postagem_id',
                    as: 'comentarios'
                }
            },

            {
                //Project é usado para montar o resultado da query
                //Nela eu coloquei para pegar apenas o primeiro eleamento da array das listas de exercicio, consumo e duvida
                //e para indicar que quero os outros elementos de um posto temos que colocar nomeElemento: 1
                $project: {
                    exercicio: {$arrayElemAt:["$exercicio",0]},
                    consumo: {$arrayElemAt:["$consumo",0]},
                    duvida: {$arrayElemAt:["$duvida",0]},
                    linkFoto: 1,
                    usuario_id: 1,
                    totalComentarios : {$size:"$comentarios"},
                }
            },
        ],function (err, postagem){
            if (err){
                throw err;
                reject({"status":false, "message":"Erro ao ovter postagem", "error": err});
            } 
            console.log(this.postagem);
            resolve(postagem);   
        } );

    });

    function testes (idPostagem){
        console.log(idPostagem);
        Comentario.count({postagem_id: idPostagem}, function(err, c) {
            console.log('Count is ' + c);
            return c;
       });
    }
}
