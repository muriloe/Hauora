var Pessoas = require('../models/pessoaModel');
var Clientes = require('../models/clienteModel');
var Anamneses = require('../models/anamneseModel');
var Doencas = require('../models/doencaModel');
var Consumos = require('../models/consumoModel');
var Remedios = require('../models/remedioModel');
var mongoose = require('mongoose');

module.exports = function(app){

    //Método utilizado para inicar a base de dados
    app.get('/api/iniciarBanco', function(req, res){
        
        //Cria uma pessoa
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
        
        //Cria um cliente
        var iniciaCliente = new Clientes({
            objetivo: "Ficar gordão",
            pessoa: iniciaPessoa._id
        });
        iniciaCliente.save(function (err, results) {
            if (err) return handleError(err);
        });

        //Cria um tipo anamnese para em seguida criar uma doença
        var anamneseGenericaDoenca = new Anamneses({
            cliente: iniciaCliente._id
        });
        anamneseGenericaDoenca.save(function (err) {
            if (err) return handleError(err);
        });

        //Cria uma doenca para a anamnese criada acima
        var doenca = new Doencas({
            nome: 'Alergia Crônica',
            descricao: 'Não posso comer qualquer alimento com lactose',
            anamnese: anamneseGenericaDoenca._id
        });
        doenca.save(function (err) {
            if (err) return handleError(err);
        });

        //Cria um tipo anamnese para em seguida criar um remédio
        var anamneseGenericaRemedio = new Anamneses({
            cliente: iniciaCliente._id
        });
        anamneseGenericaRemedio.save(function (err) {
            if (err) return handleError(err);
        });
        //Cria um remédio para a anamnese criada acima
        var remedio = new Remedios({
            nome: 'Rupafim 3ml/g',
            descricao: 'Remédio para a alergia a lactose',
            anamnese: anamneseGenericaRemedio._id
        });
        remedio.save(function (err){
            if (err) return handleError(err);
        });

        //Cria um tipo anamnese para em seguida criar um consumo
        var anamneseGenericaConsumo = new Anamneses({
            cliente: iniciaCliente._id
        });
        anamneseGenericaConsumo.save(function (err) {
            if (err) return handleError(err);
        });
        //Cria um consumo para a anamnese criada acima
        var consumo = new Consumos({
            texto: "Feijão com arroz",
            sentimento: "Triste",
            observacao: "Quando estou triste gosto de comer arrroz e feijão",
            anamnese: anamneseGenericaConsumo._id
        });
        consumo.save(function (err){
            if (err) return handleError(err);
        });

        //Cria um tipo anamnese para em seguida criar um consumo
        var anamneseGenericaConsumo2 = new Anamneses({
            cliente: iniciaCliente._id
        });
        anamneseGenericaConsumo2.save(function (err) {
            if (err) return handleError(err);
        });
        //Cria um consumo para a anamnese criada acima
        var consumo2 = new Consumos({
            texto: "Omelete",
            sentimento: "Cansado",
            observacao: "Acordei cansado e me deu vontade de comer omelete pela manhã",
            anamnese: anamneseGenericaConsumo2._id
        });
        consumo2.save(function (err){
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
}


