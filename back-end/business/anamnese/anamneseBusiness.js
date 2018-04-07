let Cliente = require("../../models/clienteModel");
let Anamnese = require("../../models/anamneseModel");
let Remedio = require("../../models/remedioModel");
let Doenca = require("../../models/doencaModel");

//Cria um anamnese completa salvando cliente, anamnese e (remedio, doença, consumos)
exports.criarAnamneseCompleta = function(dat){
    return new Promise(function(resolve,reject){
        var cli = new Cliente(dat.cliente);
        console.log(cli);
        cli.save(function (err, results) {
            console.log('222');
            if(err) {
                console.log('22'+err);
                reject({"status":false,"message": "Erro ao salvar o contador, tente novamente mais tarde", "error": err});
            }
        });
        var anamnese = new Anamnese({
            cliente: cli._id,
        });
        anamnese.save(function (err, results) {
            if(err) {
                console.log('22222');
                reject({"status":false,"message": "Erro ao salvar o contador, tente novamente mais tarde", "error": err});
            }
        });
        console.log(Object.keys(dat.remedio).lenght + "-*-*-*3333");
        for(var i = 0; i< Object.keys(dat.remedio).length; i++){
            console.log(dat.remedio[i]+ "3333");
            var remedioSelecionado = dat.remedio[i];
            var remedio = new Remedio({
                nome:       remedioSelecionado.nome,
                descricao:  remedioSelecionado.descricao,
                anamnese:   anamnese._id
            });
            remedio.save(function (err, results) {
                console.log('444save');
                if(err) {
                    console.log('444errr');
                    reject({"status":false,"message": "Erro ao salvar o contador, tente novamente mais tarde", "error": err});
                }
            });
        }
        console.log('xaxa');
        console.log(Object.keys(dat.doenca).lenght + "13333");
        for(var i = 0; i< Object.keys(dat.doenca).length; i++){
            console.log('555-----------------');
            var doencaSelecionada = dat.doenca[i];
            var doenca = new Doenca({
                nome:       doencaSelecionada.nome,
                descricao:  doencaSelecionada.descricao,
                anamnese:   anamnese._id
            });
            doenca.save(function (err, results) {
                console.log('555savve');
                if(err) {
                    console.log('555errr');
                    reject({"status":false,"message": "Erro ao salvar o contador, tente novamente mais tarde", "error": err});
                }
                else {
                    resolve({"status": true, "anamnese": anamnese });
                }
            });
        }

        

        
        
    });
}