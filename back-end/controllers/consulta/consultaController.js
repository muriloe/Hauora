var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
var Cliente =           require('../../models/clienteModel');
var consultaBusiness =  require('../../business/consulta/consultaBusiness');
const ObjectId =        mongoose.Types.ObjectId;

module.exports = function(app) {

    app.post('/api/consulta', function(req, res){
        console.log('ASDASDASDASD');
        console.log(req.body.json);
        console.log(JSON.parse(req.body.json));

        
        consultaBusiness.salvarConsulta(req.body).then(function(response){
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.status(404).end(JSON.stringify(err));
        });

        
    });

}