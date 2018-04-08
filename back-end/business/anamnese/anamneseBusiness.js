let Cliente = require("../../models/clienteModel");
let Anamnese = require("../../models/anamneseModel");
let Remedio = require("../../models/remedioModel");
let Doenca = require("../../models/doencaModel");
let Consumo = require("../../models/consumoModel");

//Cria um anamnese completa salvando cliente, anamnese e (remedio, doença, consumos)
exports.criarAnamneseCompleta = function(dat){
    return new Promise(function(resolve,reject){
        let nCliente = new Cliente(dat.cliente);
        let nAnamnese = new Anamnese();
        nAnamnese.cliente = nCliente._id;
        let doencaList = [];
        let remedioList = [];
        let consumoList = [];
        console.log(dat);
        
        //Salva a imagem no servidor
        var base64Foto = dat.cliente.foto.replace(/^data:image\/jpeg;base64,/, "");
        var urlPhoto = './uploads/'+nCliente._id+'.jpeg';
        var urlServer = '/uploads/'+nCliente._id+'.jpeg';
        require("fs").writeFile(urlPhoto, base64Foto, 'base64', function(err) {
            reject({"status":false, "message":"Erro ao salvar a forto", "error": err});
        });
        console.log("-------------------------------------------------------");
        nCliente.foto = urlServer;
        nCliente.data_nascimento = new Date(dat.cliente.data_nascimento);
        console.log("111111111111111111");
        console.log(nCliente);
        console.log("11111111111110");


        //Salva as doenças em uma array e adicionar o id na anamnese
        console.log("0000000000000000000000");
        console.log(dat.doencas);
        console.log("0000000000000000000000");
        console.log("1" + Object.keys(dat.doencas).length);
        for(var i = 0; i< Object.keys(dat.doencas).length; i++){
            console.log("2" + Object.keys(dat.doencas).length);
            nDoenca = new Doenca({
                nome:       dat.doencas[i].nome,
                descricao:  dat.doencas[i].descricao,
                anamnese:   nAnamnese._id
            });
            doencaList.push(nDoenca);
            nAnamnese.doenca.push(nDoenca._id);
        }
        console.log("3" + Object.keys(dat.remedios).length);
        //Salva os remedios em uma array e adicionar o id na anamnese
        for(var i = 0; i< Object.keys(dat.remedios).length; i++){
            

            nRemedio = new Remedio({
                nome:       dat.remedios[i].nome,
                descricao:  dat.remedios[i].descricao,
                anamnese:   nAnamnese._id
            });
            remedioList.push(nRemedio);
            nAnamnese.remedio.push(nRemedio._id);
        }
        
        //Salva os consumos em uma array e adicionar o id na anamnese
        console.log("4" + Object.keys(dat.consumos).length);
        for(var i = 0; i< Object.keys(dat.consumos).length; i++){
            console.log("5 " + Object.keys(dat.consumos).length);
            nConsumo = new Consumo({
                texto:          dat.consumos[i].texto,
                data:           new Date(dat.consumos[i].data),
                sentimento:     dat.consumos[i].sentimento,
                observacao:     dat.consumos[i].observacao,
                anamnese:       nAnamnese._id
            });
            consumoList.push(nConsumo);
            nAnamnese.consumo.push(nConsumo._id);
        }

        console.log("salva 1" + Object.keys(dat.consumos).length);
        nCliente.save(function (err, results) {
            if(err) {
                console.log("Erro ao salvar cliente");  
                reject({"status":false, "message":"Erro ao salvar cliente", "error": err});
            }
            else{
                console.log("Cliente Salvo");  
            }
        });

        nAnamnese.save(function (err, results) {
            if(err) {
                console.log("Erro ao salvar anamnese"); 
                reject({"status":false, "message":"Erro ao salvar anamnese", "error": err});
            }
            else{
                console.log("Salvou anamnse")
            }
        });

        for(var i = 0; i< doencaList.length; i++){
            nDoenca = new Doenca(doencaList[i]);
            nDoenca.save(function (err, results) {
                if(err) {
                    console.log("Erro ao salvar doenca "+ i); 
                    reject({"status":false, "message":"Erro ao salvar doenca", "error": err});

                }
                else{
                    console.log("Salvou Doenca");
                }
            });
        }

        for(var i = 0; i< remedioList.length; i++){
            nRemedio = new Remedio(remedioList[i]);
            nRemedio.save(function (err, results) {
                if(err) {
                    console.log("Erro ao salvar Remedio "+ i); 
                    reject({"status":false, "message":"Erro ao salvar Remedio", "error": err});
                }
                else{
                    console.log("Salvou Remedio");
                }
            });
        }

        for(var i = 0; i< consumoList.length; i++){
            nConsumo = new Consumo(consumoList[i]);
            nConsumo.save(function (err, results) {
                if(err) {
                    console.log("Erro ao salvar consumo "+ i); 
                    reject({"status":false, "message":"Erro ao salvar Consumo", "error": err});

                }
                else{
                    console.log("Salvou consumo");
                }
            });
        }

        var anamnseSend = {
            _id: nAnamnese._id,
            data: nAnamnese.data,
            cliente: nCliente,
            remedio: remedioList,
            doenca: doencaList,
            consumo: consumoList
 
        };
        console.log("a responder: ");

        console.log(anamnseSend);
        resolve({ "status":true,"anamnese":anamnseSend });

        console.log("----------doenca------");
        console.log(doenca);
        console.log("----------remedio------");
        console.log(remedio);
        console.log("----------consumo------");
        console.log(consumo);
        console.log("----------anamnese------");
        console.log(nAnamnese);




        
    });
}

