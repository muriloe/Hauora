var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var comentarioSchema = new Schema({
    texto:              {type: String},
    data:               {type: Date, default:Date.now()},
    link_arquivo:       {type: String},
    usuario_id:         {type: ObjectId, ref: 'Clientes'},
    postagem_id:        {type: ObjectId, ref: 'Postagens'},
    consulta_id:        {type: ObjectId, ref: 'Consultas'},
    nutricionista_id:   {type: ObjectId, ref: 'Nutricionista'},
});

var Comentario = mongoose.model('Comentarios', comentarioSchema);
module.exports = Comentario;