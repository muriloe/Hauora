var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var anamneseBusiness = require('../../business/anamnese/anamneseBusiness');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function(app) {

    app.post('/api/anamnese/save', function(req, res){
        console.log("/api/anamnese/save");
        if(req.body.cliente.id){
            //TODO editar anamnese
        }
        else{
            anamneseBusiness.criarAnamneseCompleta(req.body).then(function(response){
                console.log(response);
                res.end(JSON.stringify(response));
            }).catch(function(err){
                console.log(err);
                res.end(JSON.stringify(err));
            });
        }
    });



}