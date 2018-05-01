var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
var anamneseBusiness =  require('../../business/anamnese/anamneseBusiness');
const ObjectId =        mongoose.Types.ObjectId;

module.exports = function(app) {

    app.post('/api/anamnese/save', function(req, res){
        console.log("/api/anamnese/save");
        if(req.body.cliente.id){
            //TODO editar anamnese
        }
        else{
            anamneseBusiness.criarAnamneseCompleta(req.body).then(function(response){          
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



}