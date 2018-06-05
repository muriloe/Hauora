var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
var anamneseBusiness =  require('../../business/anamnese/anamneseBusiness');
const ObjectId =        mongoose.Types.ObjectId;
var jwt =               require('jwt-simple');
let jwtInfo =           require("../../config/jwt.json");

module.exports = function(app) {

    app.post('/api/anamnese/save', function(req, res){
        console.log("/api/anamnese/save");
        if(req.body.cliente.id){
            //TODO editar anamnese
        }
        else{
            anamneseBusiness.criarAnamneseCompleta(req.body).then(function(response){          
                res.header('jwt', [jwt.encode(response, jwtInfo.secret)]);
                res.end(JSON.stringify(response));
            }).catch(function(err){
                res.end(JSON.stringify(err));
            });
        }
    });

    //obtem a anamnese a partir do id de usuário
    app.get('/api/anamnese/:id', function(req, res, next){
        console.log("Busca por anamnese de usuário pelo iduser:");
        console.log(req.params.id);
        anamneseBusiness.obterAnamnesePeloUserId(req.params.id).then(function(response){          
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });  
    });

    //Obtem a lista de remedios com o id da anamnese
    app.get('/api/anamnese/remedios/:id', function(req, res, next){
        console.log("Busca por remedio de id da anamnese");
        console.log(req.params.id);
        anamneseBusiness.getRemedios(req.params.id).then(function(response){          
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });  
    });

    //Obtem a lista de doenca com o id da anamnese
    app.get('/api/anamnese/doencas/:id', function(req, res, next){
        console.log("Busca por doencas de id da anamnese");
        console.log(req.params.id);
        anamneseBusiness.getDoencas(req.params.id).then(function(response){          
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });  
    });

    //Obtem a lista de consumo com o id da anamnese
    app.get('/api/anamnese/consumos/:id', function(req, res, next){
        console.log("Busca por consumos de id da anamnese");
        console.log(req.params.id);
        anamneseBusiness.getConsumos(req.params.id).then(function(response){          
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });  
    });
    
    app.post('/api/criarPaciente', function(req, res){
        console.log('criar novo paciente');
        console.log(req.body.json);
        console.log(JSON.parse(req.body.json));

        anamneseBusiness.criarPaciente(JSON.parse(req.body.json)).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.status(404).end(JSON.stringify(err));
        }); 
    });



}