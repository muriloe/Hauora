var Pessoas = require('../models/pessoaModel');
var Clientes = require('../models/clienteModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({
        extended: true
      }));

    app.use(bodyParser.json());

    app.get('/api/pessoas/:nome', function(req, res){
        Pessoas.find({ nome: req.params.nome }, 
        function(err, pessoa){
            if (err) throw err;
            res.send(pessoa);
            
        })
    });

    app.get('/api/pessoa/:id', function(req, res){
        Pessoas.findById({_id: req.params.id }, 
        function (err, pessoa){
            if (err) throw err;
            res.send(pessoa);
        } );
    });

    app.post('/api/pessoa', function(req, res){
        if(req.body.id) {
            Pessoas.findByIdAndUpdate(req.body.id , {
                nome: req.body.nome, 
                email: req.body.email,
                telefone: req.body.telefone,
                sexo: req.body.sexo,
                data_nascimento: req.body.data_nascimento
            }, function(err, pessoa){
                if (err) throw err;
                res.send('Sucessoooo');
            })
        }
        else{
            var novaPessoa = Pessoas({
                nome: req.body.nome, 
                email: req.body.email,
                telefone: req.body.telefone,
                sexo: req.body.sexo,
                data_nascimento: req.body.data_nascimento
            });
            novaPessoa.save(function(err){
                if (err) throw err;
                res.send('Success');
            });
        }
    });

    app.delete('/api/pessoa', function(req, res){
        Pessoas.findByIdAndRemove(req.body.id, function(err){
            if(err) throw err;
            res.send('Deletou o maluco');
        })
    });

    app.post('/api/cliente', function(req, res){
        if(req.body.id) {
            //TODO: terminar 
        }
        else{
            var novaPessoa = Pessoas({
                nome: req.body.nome, 
                email: req.body.email,
                telefone: req.body.telefone,
                sexo: req.body.sexo,
                data_nascimento: req.body.data_nascimento    
            });
            novaPessoa.save(function (err) {
                if (err) return handleError(err);
            });

            var novoCliente = Clientes({
                objetivo: req.body.objetivo, 
                pessoa: novaPessoa._id
   
            });
            novoCliente.save(function(err, results){
                if (err) throw err;
                res.send(results);
            });
        }
    });
}