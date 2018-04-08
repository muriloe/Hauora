var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var anamneseBusiness = require('../../business/anamnese/anamneseBusiness');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function(app) {

    app.post('/api/anamnese/save', function(req, res){
        console.log('111');
        if(req.body.cliente.id){
            //TODO editar anamnese
        }
        else{
            console.log('11');
            anamneseBusiness.criarAnamneseCompleta(req.body).then(function(response){
                res.end(JSON.stringify(response));
            }).catch(function(err){
                res.end(JSON.stringify(err));
            });
        }
    });

}