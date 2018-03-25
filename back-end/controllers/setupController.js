var Pessoas = require('../models/pessoaModel');
var Clientes = require('../models/clienteModel');
var mongoose = require('mongoose');

module.exports = function(app){

    //Método utilizado para inicar a base de dados
    app.get('/api/iniciarBanco', function(req, res){
        var iniciaPessoa = new Pessoas({
            nome: 'Murilo',
            email: 'murilo0121@gmail.com',
            telefone: '41996833605',
            sexo: 1,
            data_nascimento: new Date(1994, 01, 21)
        });
        iniciaPessoa.save(function (err) {
            if (err) return handleError(err);
        });
        

        var iniciaCliente = new Clientes({
            objetivo: "Ficar Gordão para caraleo",
            pessoa: iniciaPessoa._id
        });
        iniciaCliente.save(function (err, results) {
            if (err) return handleError(err);
            res.send(results);
          });

    });

    //Método utilizado para limpar a base de dados
    app.get('/api/deletarTudoIniciarBanco', function(req, res){
        deletarTudo();

        res.redirect('/api/iniciarBanco');
    });

    app.get('/api/deletarTudo', function(req, res){
        deletarTudo();
        res.send("Foi deletado absolutamente TUDO!")
       
    });

    function deletarTudo(){
        mongoose.connection.collections['clientes'].drop( function(err) {
            console.log('clientes dropped');
        });
        mongoose.connection.collections['pessoas'].drop( function(err) {
            console.log('pessoas dropped');
        });
    }
}


