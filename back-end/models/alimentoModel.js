var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var alimentoSchema = new Schema({
    nome:       {type: String},
    porcao:     {type: String},
    grupo:      {type: ObjectId, ref: 'Grupos'}
});

var Alimento = mongoose.model('Alimentos', alimentoSchema);
module.exports = Alimento;