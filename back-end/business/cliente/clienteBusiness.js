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
