//UTILIZADA SOMENTE PARA TESTES

var Pessoas =       require('../models/pessoaModel');
var Clientes =      require('../models/clienteModel');
var Anamneses =     require('../models/anamneseModel');
var Doencas =       require('../models/doencaModel');
var Consumos =      require('../models/consumoModel');
var Remedios =      require('../models/remedioModel');
var bodyParser =    require('body-parser');
var async =         require('async');
var mongoose =      require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function(app) {
    app.use(bodyParser.urlencoded({
        extended: true
      }));

    app.use(bodyParser.json());

    /*
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

    //Obtem um cliente pelo id. Internamente ele busca a refência por pessoa no banco
    //O $match ser como um WHERE no SQL normal e o LOOKUP como um innerjoin
    app.get('/api/cliente/:id', function(req, res){
        Clientes.aggregate([
            { $match : {_id: ObjectId(req.params.id)}
            },
            { $lookup:
              {
                from: 'pessoas',
                localField: 'pessoa',
                foreignField: '_id',
                as: 'pessoa'
              }
            },
          ],function (err, cliente){
            if (err) throw err;
            res.send(cliente);
        } );
    });

    //TODO: criar método para verificar se email já existe, isso está crashando a palicação
    app.post('/api/cliente', function(req, res){
        if(req.body.id) {
            Clientes.findById(req.body.id, function(err, cliente){
                if (err) throw err;
                //res.send(cliente.pessoa);
                Pessoas.findByIdAndUpdate(cliente.pessoa, {
                    nome: req.body.nome, 
                    email: req.body.email,
                    telefone: req.body.telefone,
                    sexo: req.body.sexo,
                    data_nascimento: req.body.data_nascimento
                }, function(err, pessoa){
                    if (err) throw err;
                });
                Clientes.findByIdAndUpdate(req.body.id, {
                    objetivo: req.body.objetivo
                }, function(err, ncliente){
                    if (err) throw err;
                    res.send("cliente atualizado:" + ncliente);
                });
                
            });
            
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
                if (err) throw err;
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

     //TODO: doing
    //Obtem a anamnese de um cliente a partir do seu ID de cliente
    app.get('/api/anamnese/remedio/:id', function(req, res){
        Anamneses.aggregate([
            { $match : {cliente: ObjectId(req.params.id)}
            },

        ],function (err, anamneses){
            if (err) throw err;
            anamneses.forEach(anam => {
                Remedios.aggregate([
                    {
                        $match: {anamnese: anam._id}
                    }
                ],function(err, rem){
                    console.log(rem);
                });
                
            });
        }
        ) 
    });
    
    //TODO: doing
    app.get('/api/anamnese/consumo/:id', function(req, res){
        Anamneses.find({cliente: req.params.id}, function (err, aaa){
            async.forEach(aaa, function(bbb, done){
                Consumos.find().where('anamnese').in([bbb._id]).exec(function(err, ccc){
                    console.log(ccc);
                    
                })
            });
        });
     

    });
    */
}