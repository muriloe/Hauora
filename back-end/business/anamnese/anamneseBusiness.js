let Cliente =       require("../../models/clienteModel");
let Anamnese =      require("../../models/anamneseModel");
let Remedio =       require("../../models/remedioModel");
let Doenca =        require("../../models/doencaModel");
let Consumo =       require("../../models/consumoModel");
let serverInfo =    require("../../config/server");



//Cria um anamnese completa salvando cliente, anamnese e (remedio, doença, consumos)
exports.criarAnamneseCompleta = function(dat){
    return new Promise(function(resolve,reject){
        if(dat.cliente._id){
            Anamnese.find({cliente: dat.cliente._id}, function(err, anamnese) {
                if (!err) {
                    console.log("entrou onde queria");
                    console.log(anamnese);
                    minhaAnamenese = new Anamnese(anamnese[0]);
                    listaIdDoenca = minhaAnamenese.doenca;
                    listaIdConsumo = minhaAnamenese.consumo;
                    listaIdRemedio = minhaAnamenese.remedio;
                    console.log(listaIdConsumo);
                    
                    listaIdDoenca.forEach(doenca => {
                        Doenca.remove({_id: doenca}, function(err) {
                            if (!err) {
                                console.log('savlousdiahgsk');
                            }
                            else{
                                console.log('erro');
                                console.log(err);

                            }
                        });
                    });
                    listaIdConsumo.forEach(consumo => {
                        Consumo.remove({_id: consumo}, function(err) {
                            if (!err) {
                                console.log('savlousdiahgsk');
                            }
                            else{
                                console.log('erro');
                                console.log(err);

                            }
                        });
                    });
                    listaIdRemedio.forEach(remedio => {
                        Remedio.remove({_id: remedio}, function(err) {
                            if (!err) {
                                console.log('savlousdiahgsk');
                            }
                            else{
                                console.log('erro');
                                console.log(err);

                            }
                        });
                    });
                    Anamnese.remove({cliente: minhaAnamenese.cliente}, function(err) {
                        if (!err) {
                            console.log('savlousdiahgsk');
                        }
                        else{
                            console.log('erro');
                            console.log(err);

                        }
                    });
                    let nAnamnese = new Anamnese();
                    nAnamnese.cliente = minhaAnamenese.cliente;
                    let doencaList = [];
                    let remedioList = [];
                    let consumoList = [];

                    //Salva as doenças em uma array e adicionar o id na anamnese
                    console.log(dat.doencas);
                    for(var i = 0; i< Object.keys(dat.doencas).length; i++){
                        nDoenca = new Doenca({
                            nome:       dat.doencas[i].nome,
                            descricao:  dat.doencas[i].descricao,
                            anamnese:   nAnamnese._id
                        });
                        doencaList.push(nDoenca);
                        nAnamnese.doenca.push(nDoenca._id);
                    }

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

                        novoTipo = dat.consumos[i].tipo;
                        if(dat.consumos[i].tipo === "Café da manhã"){
                            dat.consumos[i].tipo='CAFE_DA_MANHA';
                        }
                        if(dat.consumos[i].tipo === "Lanche da manhã"){
                            dat.consumos[i].tipo='LANCHE_DA_MANHA';
                        }
                        if(dat.consumos[i].tipo === "Almoço"){
                            dat.consumos[i].tipo='ALMOCO';
                        }
                        if(dat.consumos[i].tipo === "Lanche"){
                            dat.consumos[i].tipo='LANCHE';
                        }
                        if(dat.consumos[i].tipo === "Janta"){
                            dat.consumos[i].tipo='JANTA';
                        }
                        nConsumo = new Consumo({
                            texto:          dat.consumos[i].texto,
                            data:           new Date((dat.consumos[i].data)*1000),
                            sentimento:     dat.consumos[i].sentimento,
                            observacao:     dat.consumos[i].observacao,
                            tipo:           dat.consumos[i].tipo,
                            anamnese:       nAnamnese._id
                        });
                        console.log(nConsumo);
                        consumoList.push(nConsumo);
                        nAnamnese.consumo.push(nConsumo._id);
                        nAnamnese.save(function (err, results) {
                            console.log("iniciando salvção de atualizao anamnes");
                            if(err) {
                                console.log(err + "Erro ao atualizao anamnese"); 
                                reject({"status":false, "message":"Erro ao salvar anamnese", "error": err});
                            }
                            else{
                                console.log("Salvou anamnse")
                            }
                        });
            
                        for(var i = 0; i< doencaList.length; i++){
                            console.log("iniciando salvção de doebnca");
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
                            console.log("iniciando salvção de remedio");
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
                            console.log("iniciando salvção de consumo");
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
                            cliente: dat.cliente._id,
                            remedio: remedioList,
                            doenca: doencaList,
                            consumo: consumoList
                        };
            
                        resolve({ "status":true,"anamnese":anamnseSend }); 
                    }

                }
                else {
                    reject({"status":false, "message":"Erro ao salvar anamnese", "error": err});
    
                }
            });

        }else{
            //TODO: validar se email já está em uso
            //Cria um novo cliente com base nos dados enviados(json).
            //Caso precise adicionar um novo atributo adicione aqui
            //O banco salvará automaticamente
            let nCliente = new Cliente({
                objetivo: dat.cliente.objetivo,
                sexo: dat.cliente.sexo,
                telefone: dat.cliente.telefone,
                email: dat.cliente.email,
                nome: dat.cliente.nome,
                nome_mae: dat.cliente.nome_mae,
                data_nascimento: new Date(dat.cliente.data_nascimento),
            });
            console.log("novo cliente");
            console.log("dataNASC:");
            console.log(dat.cliente.data_nascimento);
            let nAnamnese = new Anamnese();
            nAnamnese.cliente = nCliente._id;
            let doencaList = [];
            let remedioList = [];
            let consumoList = [];

            //Salva a imagem no servidor se tiver
            if(dat.cliente.foto){
                console.log("tem fto");
                var base64Foto = dat.cliente.foto.replace(/^data:image\/jpeg;base64,/, "");
                console.log("upando foto");
                //Prepara o endereço onde vai salvar a foto
                var urlPhoto = './uploads/'+nCliente._id+'.jpeg';
                //Adiciona o endereço do servidor
                var urlServer = serverInfo.serverUrl + '/uploads/'+nCliente._id+'.jpeg';
                //Grava a foto
                require("fs").writeFile(urlPhoto, base64Foto, 'base64', function(err) {
                    if (err){
                        reject({"status":false, "message":"Erro ao salvar a foto", "error": err});
                    }
                });
                nCliente.foto = urlServer;
            }
            
            //Salva as doenças em uma array e adicionar o id na anamnese
            console.log(dat.doencas);
            for(var i = 0; i< Object.keys(dat.doencas).length; i++){
                nDoenca = new Doenca({
                    nome:       dat.doencas[i].nome,
                    descricao:  dat.doencas[i].descricao,
                    anamnese:   nAnamnese._id
                });
                doencaList.push(nDoenca);
                nAnamnese.doenca.push(nDoenca._id);
            }

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

                novoTipo = dat.consumos[i].tipo;
                if(dat.consumos[i].tipo === "Café da manhã"){
                    dat.consumos[i].tipo='CAFE_DA_MANHA';
                }
                if(dat.consumos[i].tipo === "Lanche da manhã"){
                    dat.consumos[i].tipo='LANCHE_DA_MANHA';
                }
                if(dat.consumos[i].tipo === "Almoço"){
                    dat.consumos[i].tipo='ALMOCO';
                }
                if(dat.consumos[i].tipo === "Lanche"){
                    dat.consumos[i].tipo='LANCHE';
                }
                if(dat.consumos[i].tipo === "Janta"){
                    dat.consumos[i].tipo='JANTA';
                }
                nConsumo = new Consumo({
                    texto:          dat.consumos[i].texto,
                    data:           new Date((dat.consumos[i].data)*1000),
                    sentimento:     dat.consumos[i].sentimento,
                    observacao:     dat.consumos[i].observacao,
                    tipo:           dat.consumos[i].tipo,
                    anamnese:       nAnamnese._id
                });
                console.log(nConsumo);
                consumoList.push(nConsumo);
                nAnamnese.consumo.push(nConsumo._id);
            }
            console.log('--------------------------');
            console.log(nCliente);
            
            nCliente.save(function (err, results) {
                console.log("iniciando salvção de cliente");
                if(err) {
                    console.log("Erro ao salvar cliente");  
                    console.log(err);
                    reject({"status":false, "message":"Erro ao salvar cliente", "error": err});
                }
                else{
                    console.log("Cliente Salvo");  
                }
            });

            nAnamnese.save(function (err, results) {
                console.log("iniciando salvção de anamnes");
                if(err) {
                    console.log("Erro ao salvar anamnese"); 
                    reject({"status":false, "message":"Erro ao salvar anamnese", "error": err});
                }
                else{
                    console.log("Salvou anamnse")
                }
            });

            for(var i = 0; i< doencaList.length; i++){
                console.log("iniciando salvção de doebnca");
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
                console.log("iniciando salvção de remedio");
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
                console.log("iniciando salvção de consumo");
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

            resolve({ "status":true,"anamnese":anamnseSend });  
        }     
    });
}

exports.obterAnamnesePeloUserId = function(dat){
    console.log("obtendo:");
    return new Promise(function(resolve,reject){

        
        Anamnese.find({'cliente': dat}, function(err, anamnese){
            if (err){
                reject({"status":false, "message":"Erro ao obter anamense pelo id", "error": err});
            }
            else{
                console.log("sucesso anam");
                resolve({ "status":true,"anamnese":anamnese });       
            }
        });
    });
}

//Obtem os remedios a partir do id da anamnese
exports.getRemedios = function(dat){
    console.log("obtendo:");
    return new Promise(function(resolve,reject){
        Remedio.find({'anamnese': dat}, function(err, remedios){
            if (err){
                reject({"status":false, "message":"Erro ao obter remedios pelo id anamnese", "error": err});
            }
            else{
                console.log("sucesso ao obter remedios");
                resolve({ "status":true,"remedio":remedios });       
            }
        });
    });
}

//Obtem os doenca a partir do id da anamnese
exports.getDoencas = function(dat){
    console.log("obtendo:");
    return new Promise(function(resolve,reject){
        Doenca.find({'anamnese': dat}, function(err, doenca){
            if (err){
                reject({"status":false, "message":"Erro ao obter doenca pelo id anamnese", "error": err});
            }
            else{
                console.log("sucesso ao obter doenca");
                resolve({ "status":true,"doenca":doenca });       
            }
        });
    });
}


//Obtem os consumo a partir do id da anamnese
exports.getConsumos = function(dat){
    console.log("obtendo:");
    return new Promise(function(resolve,reject){
        Consumo.find({'anamnese': dat}).sort({data: 'desc'}).exec(function(err, consumo) { 
            if (err){
                reject({"status":false, "message":"Erro ao obter consumo pelo id anamnese", "error": err});
            }
            else{
                console.log("sucesso ao obter consumo");
                resolve({ "status":true,"consumo":consumo });       
            }
         });
        
    });
}


//salvar um novo cliente
exports.criarPaciente = function(dat){
    console.log("obtendo:");
    return new Promise(function(resolve,reject){
        let nCliente = new Cliente({
            objetivo: dat.cliente.objetivo,
            sexo: dat.cliente.sexo,
            telefone: dat.cliente.telefone,
            email: dat.cliente.email,
            nome: dat.cliente.nome,
            data_nascimento: new Date(dat.cliente.data_nascimento),
        });
        
        nCliente.save(function (err, results) {
            console.log("iniciando salvção de cliente");
            if(err) {
                console.log("Erro ao salvar cliente");  
                reject({"status":false, "message":"Erro ao salvar cliente", "error": err});
            }
            else{
                resolve({ "status":true,"results":results });       
            }
        });
    });
}