var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var postagemSchema = new Schema({
    linkFoto:       {type: String},
    usuario_id:     {type: ObjectId, ref: 'Clientes'},
    consumo_id:     {type: ObjectId, ref: 'Consumos'},
    exercicio_id:   {type: ObjectId, ref: 'Duvidas'},
    duvida_id:      {type: ObjectId, ref: 'Exercicios'},
    data:           {type: Date, default:Date.now()},
    visualizado:    {type: Boolean, default: false},
});

var Postagem = mongoose.model('Postagens', postagemSchema);
module.exports = Postagem;