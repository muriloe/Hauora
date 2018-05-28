var bodyParser =    require('body-parser');
var mongoose =      require('mongoose');
var Cliente =       require('../../models/clienteModel');
const ObjectId =    mongoose.Types.ObjectId;
var clienteBusiness=require('../../business/cliente/clienteBusiness');

module.exports = function(app) {
    
    //Obtem todos os cliente que estão fazendo anamnese. acesso = false;
    app.get('/api/clientes/anamnese', function(req, res){
        console.log("GET CLIENTES ANAMNESE");
        Cliente.find({ acesso: false }, function (err, clientes) {
            console.log(clientes);
            if (err){
                return res.status(500).json({
                    title: 'Ocorreu um erro',
                    error: err
                })
            }
            else{
                res.status(200).json({
                    message: 'Success',
                    obj: clientes
                });
            }   
        });
    });

    //Obtem todos os paciêntes. acesso = true;
    app.get('/api/clientes', function(req, res){
        console.log("GET CLIENTES");
        Cliente.find({ acesso: true }, function (err, clientes) {
            console.log(clientes);
            if (err){
                return res.status(500).json({
                    title: 'Ocorreu um erro',
                    error: err
                })
            }
            else{
                res.status(200).json({
                    message: 'Success',
                    obj: clientes
                });
            }          
        });
    });

     //Obtem todos os paciêntes com o nome do autocomplete
     app.get('/api/clientes/autocomplete/:nome', function(req, res, next){
        console.log("Auto complete busca:");
        console.log(req.params.nome);
        Cliente.find({'nome': { '$regex' : req.params.nome, '$options' : 'i' }} , function (err, clientes) {
            if (err){
                return res.status(500).json({
                    title: 'Ocorreu um erro',
                    error: err
                })
            }
            else{
                res.status(200).json({
                    message: 'Success',
                    obj: clientes
                });
            }          
        });
    });

    //Obtem o todas os clientes pelo id
    app.get('/api/cliente/:id', function(req, res, next){
        console.log("Busca por id de usuário:");
        console.log(req.params.id);
        Cliente.find({'_id': req.params.id} , function (err, cliente) {
            if (err){
                return res.status(500).json({
                    title: 'Ocorreu um erro',
                    error: err
                })
            }
            else{
                res.status(200).json({
                    message: 'Success',
                    obj: cliente
                });
            }          
        });
    });

    //Obtem o todas os clientes pelo id
    app.post('/api/cliente/recuperarSenha', function(req, res, next){
        console.log("recuperarSenha de usuário:");
        console.log(req.body);
        clienteBusiness.recuperarSenha(req.body.email).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });
    });


}