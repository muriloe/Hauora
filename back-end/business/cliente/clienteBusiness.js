let Cliente =       require("../../models/clienteModel");
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
        objetivo: dat.cliente.objetivo,
        sexo: dat.cliente.sexo,
        telefone: dat.cliente.telefone,
        email: dat.cliente.email,
        nome: dat.cliente.nome,
        nome_mae: dat.cliente.nome_mae,
        data_nascimento: new Date(dat.cliente.data_nascimento),
      });

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
            }else{
              Cliente.findById(dat.cliente._id, function (err, cliente) {
                if (err) return handleError(err);
      
                console.log("iniciando salvção de client23132132e");
                cliente.objetivo= dat.cliente.objetivo;
                cliente.sexo= dat.cliente.sexo;
                cliente.telefone= dat.cliente.telefone;
                cliente.email= dat.cliente.email;
                cliente.nome= dat.cliente.nome;
                cliente.nome_mae= dat.cliente.nome_mae;
                cliente.data_nascimento= new Date(dat.cliente.data_nascimento);
                cliente.foto = urlServer;
      
                cliente.save(function (err, cliente) {
                  if (err) return handleError(err);
                  resolve(cliente);
                });
                
      
              });
            } 
        });
        
      }else{
        Cliente.findById(dat.cliente._id, function (err, cliente) {
          if (err) return handleError(err);

          console.log("iniciando salvção de 222");
          cliente.objetivo= dat.cliente.objetivo;
          cliente.sexo= dat.cliente.sexo;
          cliente.telefone= dat.cliente.telefone;
          cliente.email= dat.cliente.email;
          cliente.nome= dat.cliente.nome;
          cliente.nome_mae= dat.cliente.nome_mae;
          cliente.data_nascimento= new Date(dat.cliente.data_nascimento);
          cliente.foto = null;

          cliente.save(function (err, cliente) {
            if (err) return handleError(err);
            resolve(cliente);
          });
          

        });
      }


  });
}


