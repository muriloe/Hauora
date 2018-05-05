var Pessoas =       require('../models/pessoaModel');
var Clientes =      require('../models/clienteModel');
var Anamneses =     require('../models/anamneseModel');
var Doencas =       require('../models/doencaModel');
var Consumos =      require('../models/consumoModel');
var Remedios =      require('../models/remedioModel');
var Alimento =      require('../models/alimentoModel');
var Grupo =         require('../models/grupoModel');
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

    //Método utilizada para instanciar os alimentos e grupos
    app.get('/api/iniciaAlimentos', function(req, res){
     
        //criação dos grupos
        var grupoBaixaCaloria = new Grupo({titulo: 'Baixa Caloria'});
        var grupoVegetaisA = new Grupo({titulo: 'Vegetais A ou Folhosos'});
        var grupoVegetaisB = new Grupo({titulo: 'Vegetais B ou Hortaliças'});  

        //criacao dos alimentos
        var alimentos = [   {nome: 'Cacau', porcao: '1 Col. S. Ras. (10g)', grupo: grupoBaixaCaloria._id},
                            {nome: 'Café Infusão', porcao: '(10% 1 X. café (80ml)', grupo: grupoBaixaCaloria._id},
                            {nome: 'Café Mate, infusão', porcao: '(5% 1 X. café (180ml)', grupo: grupoBaixaCaloria._id},
                            
                            {nome: 'Acelga', porcao: '1 porção(ões) ()50g', grupo: grupoVegetaisA._id},
                            {nome: 'Agrião', porcao: '1 porção(ões) ()50g', grupo: grupoVegetaisA._id},
                        
                            {nome: 'Abobrinha italiana, cozida', porcao: '2 Col. A. (135g)', grupo: grupoVegetaisB._id}];

        grupoBaixaCaloria.save(function (err) {
            if (err) return handleError(err);
        });

        grupoVegetaisA.save(function (err) {
            if (err) return handleError(err);
        });

        grupoVegetaisB.save(function (err) {
            if (err) return handleError(err);
        });

        //Usado para saber quando terminou de gravar a lista
        var contador = 0;
        alimentos.forEach(alimento => {
            var ali = new Alimento({nome: alimento.nome, porcao: alimento.porcao, grupo: alimento.grupo });
            ali.save(function (err) {
                console.log('Erro ao salvar grupo de alimento');
                if (err) return handleError(err);
                contador++; 
                if (contador === alimentos.length) {
                    res.send('criou alimentos');
                }
            });
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


