var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var composicaoSchema = new Schema({
    quantidade: {type: Number},
    grupo:      [{type: ObjectId, ref: 'Grupos'}],
    cardapio:   {type: ObjectId, ref: 'Cardapios'}
});

var Composicao = mongoose.model('Composicoes', composicaoSchema);
module.exports = Composicao;