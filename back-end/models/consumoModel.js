var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var consumoSchema = new Schema({
    texto: String,
    data: {type: Date, default:Date.now()},
    sentimento: String,
    observacao: String,
    anamnese: {type: ObjectId, ref: 'Anamneses', required: true} 
});

var Consumo = mongoose.model('Consumos', consumoSchema);
module.exports = Consumo;