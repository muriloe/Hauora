var mongoose =          require('mongoose');
var bodyParser =        require('body-parser');
let Cliente =           require("../../models/clienteModel");
let Consulta =          require("../../models/consultaModel");
let Cardapio =          require("../../models/cardapioModel");
let Notificacao =       require("../../models/notificacaoModel");
var nodemailer =        require('nodemailer');
const ObjectId = mongoose.Types.ObjectId;



exports.obterTodasNotificacoes = function(indice){

    var pagina = parseInt(indice);
    
    return new Promise(function(resolve, reject){
        Notificacao.aggregate([
            { $lookup:
                {
                    from: 'consultas',
                    localField: 'consulta',
                    foreignField: '_id',
                    as: 'consulta'
                }
            },
            { $lookup:
                {
                    from: 'postagens',
                    localField: 'postagem',
                    foreignField: '_id',
                    as: 'postagem'
                }
            },
            {
                 $project: {
                    _id: 1,
                    texto: 1,
                    data: 1,
                    postagem: 1,
                    consulta: 1,
                    cliente: 1,
                }
            },
            
            {$sort: {data: -1} },
            { $skip : pagina },
            { $limit : 10 }
        ], 
            function (err, notificacao){
                if (err){
                    throw err;
                    reject({"status":false, "message":"Erro ao obter consultas", "error": err});
                } 
                else{
                    resolve(notificacao);
                }
            } );
    });
}