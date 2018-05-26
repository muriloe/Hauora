let Cliente =       require("../../models/clienteModel");
let Cardapio =      require("../../models/cardapioModel");
let Composicao =    require("../../models/composicaoModel");
let Grupo =         require("../../models/grupoModel");
let Alimento =      require("../../models/alimentoModel");
let serverInfo =    require("../../config/server");
var mongoose =      require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.obterCardapioPorIdUsuario = function(clienteId){

    return new Promise(function(resolve,reject){
        Cardapio.aggregate([
            { $match : {usuario_id: ObjectId(clienteId)}
            },
            {
                $lookup:
                  {
                    from: "composicoes",
                    localField: "composicao",
                    foreignField: "_id",
                    as: "composicoes"
                  }
            },
            

           
        ],function (err, cardapio){
            if (err){
                throw err;
                reject({"status":false, "message":"Erro ao ovter cardapio", "error": err});
            } 
            console.log(this.cardapio);
            resolve(cardapio);   
        } );
    });
}