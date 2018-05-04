var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var cardapioSchema = new Schema({
    tipo:       {type: String},
    usuario_id: {type: ObjectId, ref: 'Clientes'},
    data:       {type: Date}
});

var Cardapio = mongoose.model('Cardapios', cardapioSchema);
module.exports = Cardapio;