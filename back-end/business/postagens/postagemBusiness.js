let Cliente =       require("../../models/clienteModel");
let Postagem =      require("../../models/postagemModel");
let Consumo =       require("../../models/consumoModel");   
let Exercicio =     require("../../models/exercicioModel");
let Duvida =        require("../../models/duvidaModel");
let serverInfo =    require("../../config/server");

exports.criarPostagem = function(clienteId, postagem){
    return new Promise(function(resolve,reject){
        console.log("bateu na trave é gol");
        let nPostagem = new Postagem();
        nPostagem.usuario_id = clienteId;
        console.log(nPostagem._id);

        if(postagem.linkFoto){
            console.log("tem fto na postagem");
            var base64Foto = postagem.linkFoto.replace(/^data:image\/jpeg;base64,/, "");
            console.log("upando foto");
            //Prepara o endereço onde vai salvar a foto
            var urlPhoto = './uploads/postagem/'+nPostagem._id+'.jpeg';
            //Adiciona o endereço do servidor
            var urlServer = serverInfo.serverUrl + '/uploads/postagem/'+nPostagem._id+'.jpeg';
            //Grava a foto
            require("fs").writeFile(urlPhoto, base64Foto, 'base64', function(err) {
                if (err){
                    reject({"status":false, "message":"Erro ao salvar a foto de postagem", "error": err});
                }
            });
            nPostagem.linkFoto = urlServer;
        }

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

        console.log('aiaiaiaia');
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

        console.log('eieieiei');

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
                resolve({ "status":true,"postagem":results });   
            }
        });



    });
}
