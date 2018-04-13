var Pessoas =       require('../models/pessoaModel');
var Clientes =      require('../models/clienteModel');
var Anamneses =     require('../models/anamneseModel');
var Doencas =       require('../models/doencaModel');
var Consumos =      require('../models/consumoModel');
var Remedios =      require('../models/remedioModel');
var mongoose =      require('mongoose');

module.exports = function(app){

    app.get('/api/teste', function(req, res){
        res.send('AEEEEE MERMÃO');
    });

    app.get('/api/pessoas', function(req, res){
        Clientes.find({}, function (err, aaa){
            res.send(aaa);
        });
    });

    /*
    //Método utilizado para inicar a base de dados
    app.get('/api/iniciarBanco', function(req, res){
        
        //Cria uma pessoa
        var iniciaCliente = new Clientes({
            nome: 'Murilo',
            email: 'murilo0121@gmail.com',
            senha: '123456',
            telefone: '41996833605',
            sexo: "Macho",
            data_nascimento: new Date(1994, 01, 21),
            objetivo: "Ficar gordão",
            acesso: false
        });
        iniciaCliente.save(function (err) {
            if (err) return handleError(err);
        });
        res.send('DEU BOIAa');
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
        mongoose.connection.collections['anamneses'].drop( function(err) {
            console.log('anamneses dropped');
        });
        mongoose.connection.collections['remedios'].drop( function(err) {
            console.log('remedios dropped');
        });
        mongoose.connection.collections['consumos'].drop( function(err) {
            console.log('consumos dropped');
        });
        mongoose.connection.collections['doencas'].drop( function(err) {
            console.log('doencas dropped');
        });
    }
*/
}


