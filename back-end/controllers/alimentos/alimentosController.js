var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
var alimentosBusiness = require('../../business/alimentos/alimentosBusiness');
const ObjectId =        mongoose.Types.ObjectId;

module.exports = function(app) {

    //Obtem todos os grupos
    app.get('/api/grupos', function(req, res, next){
        console.log("Buscando por grupos");
        alimentosBusiness.getGrupos().then(function(response){          
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });  
        
    });

    //Obtem todos os alimentos de um determinado grupo
    app.get('/api/alimentos/:grupoId', function(req, res, next){
        console.log("Buscando por alimentos de um determinado grupo");
        alimentosBusiness.getAlimentos(req.params.grupoId).then(function(response){          
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });  
        
    });
    
    app.get('/api/grupos/mobile', function(req, res, next){
        console.log("Buscando por alimentos e gruposo");
        alimentosBusiness.getGruposAlimentos(req.params.grupoId).then(function(response){          
            res.end(JSON.stringify(response));
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });  
        
    });

}