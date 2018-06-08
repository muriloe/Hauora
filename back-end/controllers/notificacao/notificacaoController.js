var bodyParser =        require('body-parser');
var mongoose =          require('mongoose');
var Cliente =           require('../../models/clienteModel');
var notificacaoBusiness =  require('../../business/notificacao/notificacaoBusiness');
const ObjectId =        mongoose.Types.ObjectId;


module.exports = function(app) {


    app.get('/api/notificacoes/:indice', function(req, res){
    console.log("/api/notificacoes/todas");

        notificacaoBusiness.obterTodasNotificacoes(req.params.indice).then(function(response){
            res.status(200).json({
                message: 'Success',
                obj: response
            });
        }).catch(function(err){
            res.end(JSON.stringify(err));
        });
        
    });

}