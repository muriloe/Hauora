let Cliente =       require("../../models/clienteModel");
let Nutricionista =       require("../../models/nutricionistaModel");
let serverInfo =    require("../../config/server");
var mongoose =      require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var nodemailer =        require('nodemailer');
var mongoose =          require('mongoose');
var bodyParser =        require('body-parser');

exports.recuperarSenha = function(email){

    return new Promise(function(resolve,reject){
        var newPass = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for (var i = 0; i < 6; i++)
            newPass += possible.charAt(Math.floor(Math.random() * possible.length));
    
        console.log(newPass);
        console.log(email);

        const novaSenha = {
            senha: newPass,
        };

        Cliente.update({email: email}, novaSenha, function(err, raw) {
            if (err) {
              console.log("erro ao mudar senha: " + err);
            }
            console.log("informações de usuário atualizadas: ");
        });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'hauoranutri@gmail.com',
              pass: 'S0uMongo'
            }
          });
          
          var mailOptions = {
            from: 'hauoraNutri@gmail.com',
            to: email,
            subject: 'Recuperação de senha!!!',
            html: '<font color="black">Olá, você pediu para recuperar suas senha, '+
                   'sua nova senha de acesso no aplicativo é: <b>'+newPass + '<b><br><br>Vamos juntos atingir seu objetivo!</font>'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });


        const retorno = {
          retorno: "deu boa rapaiz do ceu me deus eu não acredito nisso!"
        }
        resolve(retorno);   
    });
}


exports.atualizarUsuário = function(dat){

  return new Promise(function(resolve,reject){
      let nCliente = new Cliente({
        objetivo: dat.objetivo,
        sexo: dat.sexo,
        telefone: dat.telefone,
        email: dat.email,
        nome: dat.nome,
        nome_mae: dat.nome_mae,
        data_nascimento: new Date(dat.data_nascimento),
      });

      //Salva a imagem no servidor se tiver
      if(dat.foto){
        console.log("tem fto");
        var base64Foto = dat.foto.replace(/^data:image\/jpeg;base64,/, "");
        console.log("upando foto");
        //Prepara o endereço onde vai salvar a foto
        var urlPhoto = './uploads/'+nCliente._id+'.jpeg';
        //Adiciona o endereço do servidor
        var urlServer = serverInfo.serverUrl + '/uploads/'+nCliente._id+'.jpeg';
        //Grava a foto
        require("fs").writeFile(urlPhoto, base64Foto, 'base64', function(err) {
            if (err){
                reject({"status":false, "message":"Erro ao salvar a foto", "error": err});
            }else{
              Cliente.findById(dat._id, function (err, cliente) {
                if (err) return handleError(err);
      
                console.log("iniciando salvção de client23132132e");
                cliente.objetivo= dat.objetivo;
                cliente.sexo= dat.sexo;
                cliente.telefone= dat.telefone;
                cliente.email= dat.email;
                cliente.nome= dat.nome;
                cliente.nome_mae= dat.nome_mae;
                cliente.data_nascimento= new Date(dat.data_nascimento);
                cliente.foto = urlServer;
      
                cliente.save(function (err, cliente) {
                  if (err) return handleError(err);
                  resolve(cliente);
                });
                
      
              });
            } 
        });
        
      }else{
        Cliente.findById(dat._id, function (err, cliente) {
          if (err) return handleError(err);

          console.log("iniciando salvção de 222");
          cliente.objetivo= dat.objetivo;
          cliente.sexo= dat.sexo;
          cliente.telefone= dat.telefone;
          cliente.email= dat.email;
          cliente.nome= dat.nome;
          cliente.nome_mae= dat.nome_mae;
          cliente.data_nascimento= new Date(dat.data_nascimento);
          cliente.foto = null;

          cliente.save(function (err, cliente) {
            if (err) return handleError(err);
            resolve(cliente);
          });
        });
      }
  });
}


exports.atualizarSenhaNutricionista= function(dat){
  let nutricionistaTemp = (JSON.parse(dat.json));
  return new Promise(function(resolve,reject){
      Nutricionista.findById(nutricionistaTemp._id, function (err, nutricionista) {
         if (!err) {
            nutricionista.senha = nutricionistaTemp.senha;
            nutricionista.save(function (err, nutricionista) {
                 if (err) return handleError(err);
                 resolve(nutricionista);
            });
         }else {
          reject({"status":false, "message":"Erro ao salvar anamnese", "error": err});
        }
      });

  });
  
}

exports.atualizarInfoNutricionista= function(dat){
  console.log(dat);

  return new Promise(function(resolve,reject){
      let nNuticionista = new Nutricionista({
        email: dat.email,
        nome: dat.nome,
      });
      var nomeArquivo = nNuticionista._id;
      var linkFoto;
      if(dat.foto){
        var urlCompletaLinkExames = serverInfo.serverUrl + '/uploads/fotoNutri'+nomeArquivo+'.png';
        linkFoto = urlCompletaLinkExames;
        var base64Foto = dat.foto.value;
        var urlReqExame = './uploads/fotoNutri'+nomeArquivo+'.png';
    
        console.log('chegou até aqui');
        require("fs").writeFile(urlReqExame, base64Foto, {encoding: 'base64'}, function(err) {
            if (err){
                console.log('erro182p37');
                console.log(err);
                reject({"status":false, "message":"Erro ao salvar a reqExame", "error": err});
            }else{
              Nutricionista.findById(dat._id, function (err, cliente) {
                if (err) return handleError(err);
      
                console.log("iniciando salvção de nutri");
                cliente.email= dat.email;
                cliente.nome= dat.nome;
                cliente.foto = urlCompletaLinkExames;
      
                cliente.save(function (err, cliente) {
                  if (err) return handleError(err);
                  resolve(cliente);
                });
                
      
              });
            } 
        });
        
        
    
      }else{
        Nutricionista.findById(dat._id, function (err, cliente) {
          if (err) return handleError(err);

          console.log("iniciando salvção de nutri");
          cliente.email= dat.email;
          cliente.nome= dat.nome;

          cliente.save(function (err, cliente) {
            if (err) return handleError(err);
            resolve(cliente);
          });
          

        });
      }

  });
  
}

